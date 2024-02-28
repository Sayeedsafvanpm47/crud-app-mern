import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../app/slices/userApiSlice";
import { setCredentials } from "../../app/slices/authSlice";
import { showToastSuccess, showToastError } from "../../services/toastServices";
import Loader from "../Loader";
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
  Text,
  Heading
} from "@chakra-ui/react";

export const Login = () => {
 
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [userInfo]);

  return (
    <div>
   <Flex bg="gray.100" align="center" justify="center">
      <Heading mt={10}>Login</Heading>
    </Flex>
  
      <Flex bg="gray.100" align="center" justify="center" h="80vh">
      <Box bg="white" p={6} rounded="md" style={{width:'30rem',height:'25rem'}}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            rememberMe: false
          }}
          onSubmit={async (values) => {

            try {
              const res = await login({
                email: values.email,
                password: values.password,
              }).unwrap();
              if(!res){
                showToastError("Invalid credentials");
              }
             
              dispatch(setCredentials({ ...res }));
            
  
              showToastSuccess("Login successful");
              navigate("/", { replace: true });
            } catch (err) {
              showToastError("Invalid credentials");
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
                
                <FormControl isInvalid={!!errors.password && touched.password}>
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
                        error = "Password must contain at least 6 characters";
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
                 {isLoading ? 'Loggin in...' :'Login'}
                </Button>
              </VStack>
              <Text style={{cursor:'pointer'}} onClick={()=>navigate('/register')} fontSize='xs'>Dont have an account yet? Click here to register</Text>

            </form>
          )}
        </Formik>
      </Box>
    </Flex>
    </div>
  );
};
export default Login;
