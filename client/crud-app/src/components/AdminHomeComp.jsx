import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../app/slices/userApiSlice";
import { logout } from "../app/slices/authSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from 'react-bootstrap/Modal';

import "../components/Home/Home.css";
import { useGetUsersQuery } from "../app/slices/adminApiSlice";
import Avatar from "react-avatar";


const AdminHomeComp = () => {
const [show,setShow] = useState(false)
const [userDetail,setUserDetail] = useState({})
const handleClose = ()=> setShow(false)
const handleShow = (users)=>{
          
          setUserDetail(users)
          
          setShow(true)
}

useEffect(() => {
          console.log('userdetail', userDetail);
        }, [userDetail]);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const { data, isLoading } = useGetUsersQuery();
  

  console.log(data);

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
  return (
          <div>
            <Container>
              <Row className="d-flex userWelcomeRow">
                <Col className="d-flex userWelcome">
                  <p className="mt-3">
                    {" "}
                    Hello Welcome {userInfo ? "admin" + userInfo.username : "user"} to
                    home
                    <br />
                    <a onClick={logoutHandler}>
                      {" "}
                      {userInfo ? "Logout" : "login to continue"}
                    </a>
                  </p>{" "}
                </Col>
              </Row>

              <Row>
                <Col>
                  {show && (
                    <div
                      className="modal show"
                      style={{ display: "block", position: "initial" }}
                    >
                      <Modal.Dialog className="modal-dialog-centered">
                        <Modal.Header onClick={handleClose} closeButton>
                          <Modal.Title>Edit User Detail</Modal.Title>
                        </Modal.Header>
       
                        <Modal.Body>
                          <input type="text" value={userDetail.name} onChange={(e) =>
    setUserDetail((prevUserDetail) => ({
      ...prevUserDetail,
      name: e.target.value,
    }))
  }/>
                          <br />
                          <input type="text" value={userDetail.email} onChange={(e) =>
    setUserDetail((prevUserDetail) => ({
      ...prevUserDetail,
      email: e.target.value,
    }))}/>
                        </Modal.Body>
      
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button onClick={handleClose} variant="primary">Save changes</Button>
                        </Modal.Footer>
                      </Modal.Dialog>
                    </div>
                  )}
                </Col>
              </Row>
             
              <Row>
                <Col
                  className="d-flex"
                  style={{ overflowX: "auto", marginRight: "20px" }}
                >
                  {data &&
                    data.map((users) => (
                      <Card style={{ width: "18rem", marginRight: "20px" }}>
                        <Card.Header
                          style={{
                            alignContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <Avatar name={users.username} size="50" round={true} />{" "}
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
                          {" "}
                          <Button onClick={()=>{
                              const user = {id:users.id,name:users.username,email:users.email}
                              handleShow(user)
                              console.log(users)
                          }} variant="primary">
                            Edit User
                          </Button>
                        </Card.Footer>
                      </Card>
                      
                    ))}
                </Col>
              </Row>
            </Container>
          </div>
        );
};

export default AdminHomeComp;
