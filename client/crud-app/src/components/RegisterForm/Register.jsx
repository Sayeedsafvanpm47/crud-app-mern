import React, { useEffect, useState } from "react";
import { registerUser } from "../../services/userServices";
import { showToastSuccess, showToastError } from "../../services/toastServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/slices/userApiSlice";
import { setCredentials } from "../../app/slices/authSlice";

import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Text
  
} from "@chakra-ui/react";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [navigate, userInfo]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ email, username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      if (res) showToastSuccess("Registration successful");
    } catch (error) {
      showToastSuccess("Registration unsuccessful");
      console.log(error);
    }
  };
  return (
    <div>
    <Flex bg="gray.100" align="center" justify="center">
      <Heading mt={10}>Register</Heading>
    </Flex>
      <Flex bg="gray.100" align="center" justify="center" h="80vh">
       
        <Box
          bg="white"
          p={6}
          rounded="md"
          style={{ width: "30rem", height: "30rem" }}
        >
          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            onSubmit={async (values) => {
              try {
                const res = await register({
                  email: values.email,
                  password: values.password,
                  username: values.username,
                }).unwrap();
                console.log(res);

                if (res.data && res.data.error === "Conflict occured") {
                  showToastError("Conflict occurred");
                } else {
                  dispatch(setCredentials({ ...res }));

                  if (res) {
                    showToastSuccess("Registration successful");
                    navigate("/", { replace: true });
                  }
                }
              } catch (error) {
                if (error.data && error.data.error === "Conflict occured") {
                  showToastError("Email address already exists");
                } else {
                  showToastError("Registration unsuccessful");
                  console.log(error);
                }
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={6} align="flex-start">
                <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                      validate={(value) => {
                        let error;

                        if (!value) {
                          error = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            value
                          )
                        ) {
                          error = "Invalid email address";
                        }

                        return error;
                      }}
                    />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                
                  <FormControl isInvalid={!!errors.username && touched.username}>
                    
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 5) {
                          error = "Username must contain at least 5 characters";
                        }

                        return error;
                      }}
                    />
                     <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>
                 
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      variant="filled"
                      validate={(value) => {
                        let error;

                        if (value.length < 3) {
                          error = "Password must contain at least 3 characters";
                        }

                        return error;
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Field
                    as={Checkbox}
                    id="rememberMe"
                    name="rememberMe"
                    colorScheme="purple"
                  >
                    Remember me?
                  </Field>
                  <Button type="submit" colorScheme="purple" width="full">
                    {isLoading?'Registring..' : 'Register'}
                  </Button>
                </VStack>
                <Text style={{cursor:'pointer'}} onClick={()=>navigate('/login')} fontSize='xs'>Already have an account? Click here to login</Text>
               
              </form>
            )}
          </Formik>
        </Box>
      </Flex>
    </div>
  );
};
