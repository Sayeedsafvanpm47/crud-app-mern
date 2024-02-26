import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Avatar from 'react-avatar'
const Profile = () => {
  return (
    <div>
          <Container style={{width:'400px', marginTop:'10rem'}}>
       
           
       
    
          <Form>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <Avatar name="Sayeed Safvan" size="100" round={true} />
                    </div>
       
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Username</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Edit
      </Button>
    </Form>
    </Container>
    </div>
  )
}

export default Profile