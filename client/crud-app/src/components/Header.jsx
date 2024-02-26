import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom';

const Header = () => {
          const navigate = useNavigate()
          const viewProfile = ()=>{
                   navigate('/profile') 
          }
         const {userInfo} = useSelector(state => state.auth) 
  return (
    <div>
          <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
  
        <Navbar.Brand href="#home">Guitar Chords!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          
           

           {userInfo ? (<NavDropdown title={userInfo?userInfo.username : ''} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={viewProfile}>Profile</NavDropdown.Item>
              <NavDropdown.Item>
                Logout
              </NavDropdown.Item>
            
            </NavDropdown>) : ''}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className='me-5'>    {userInfo?( <Avatar name={userInfo.username} size="50" round={true} />):(<Avatar name="User" size="50" round={true} />)}</div>
  
    </Navbar>
    </div>
  )
}

export default Header