import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../app/slices/userApiSlice";
import { logout } from "../app/slices/authSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import "../components/Home/Home.css";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../app/slices/adminApiSlice";
import Avatar from "react-avatar";
import { setUsersList } from "../app/slices/usersResultSlice";


const AdminHomeComp = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const location = useLocation()

  const { userData } = useSelector((state) => state.search);
  console.log("userData", userData);
  const [userDetail, setUserDetail] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (users) => {
    setUserDetail(users);
    setShow(true);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const [updateUser] = useUpdateUserMutation();

  const { data, refetch } = useGetUsersQuery();

  useEffect(() => {
    data && dispatch(setUsersList([...data]));
  }, [userDetail, data]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      alert("logout success");
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = async (userData) => {
    try {
      setShow(false);

      const { data: updatedUserData } = await updateUser(userData);

      refetch();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
 
    if (location.state && location.state.registrationSuccess) {

      refetch();
    }
  }, [location.state, refetch]);


  const navigateToAddProfile = () => {
    navigate('/addProfile');
   
  };

  return (
    <div>
     
     
      <Container>
        <Row className="">
          <Col className="d-flex userWelcome">
            <p className="mt-3">
              Hello Welcome {userInfo ? "admin" + userInfo.username : "user"} to
              home
              <br />
              <a onClick={logoutHandler}>
                {userInfo ? "Logout" : "login to continue"}
              </a>
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            {show && (
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header onClick={handleClose} closeButton>
                  <Modal.Title>Edit User Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <div className="">
                      <Input
                        className="w-100 mb-3"
                        type="text"
                        value={userDetail.name}
                        onChange={(e) =>
                          setUserDetail({ ...userDetail, name: e.target.value })
                        }
                      />
                      <FormLabel>Email</FormLabel>
                      <Input
                        readOnly
                        className="w-100"
                        type="email"
                        value={userDetail.email}
                      />
                    </div>
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    onClick={() => updateUserData(userDetail)}
                    variant="primary"
                  >
                    Save changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Row>

       

        <Row className="align-items-center">
          <Heading>User Profiles - <Button onClick={navigateToAddProfile}>Add new Profile</Button></Heading>
          {userData &&
            userData.map((users) => (
              <Card
                key={users.email}
                style={{
                  width: "25rem",
                  marginRight: "20px",
                  width: "18rem",
                  marginBottom: "2rem",
                  maxHeight: "30rem",
                  height: "15rem",
                }}
              >
                <Card.Header
                  key={users.email}
                  style={{
                    alignContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar name={users.username} size="50" round={true} />
                </Card.Header>
                <Card.Body>
                  <Card.Title>{users.username}</Card.Title>
                  <Card.Text>
                    {users.email}
                    <br />
                    Joined on: {new Date(users.createdAt).toDateString()}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    onClick={() => {
                      const user = {
                        id: users.id,
                        name: users.username,
                        email: users.email,
                      };
                      handleShow(user);
                      console.log(users);
                    }}
                    variant="info"
                    className="me-3"
                  >
                    Edit User
                  </Button>
                  <Button
                    onClick={() => {
                      const user = users._id;
                      // deleteUser(user)
                      console.log(user);
                    }}
                    variant="danger"
                  >
                    Delete User
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          {!userData.length && <p>No users info available</p>}
        </Row>
      </Container>
    </div>
  );
};

export default AdminHomeComp;
