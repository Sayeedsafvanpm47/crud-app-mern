import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useRegisterMutation } from '../app/slices/userApiSlice';

import { useNavigate } from 'react-router-dom';

function AddProfile() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username,setUserName] = useState('')     
    const [register,{isSuccess}] = useRegisterMutation()
    const navigate = useNavigate()
     
    const handleSubmit = async (e)=>{
          e.preventDefault()
          try {
                const res = await register({email,password,username}).unwrap()
                navigate('/', { state: { registrationSuccess: true } });
                  
          } catch (error) {
                    
          }
    }

  return (
 <Container>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter Username" />
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
  
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>
   
  );
}

export default AddProfile;