import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useSearchUsersQuery } from '../app/slices/adminApiSlice';
import { setUsersList } from '../app/slices/usersResultSlice';

const Header = () => {
         
          const [searchText,setSearchText] = useState('')
          const {data} = useSearchUsersQuery(searchText)
          const dispatch = useDispatch()
          console.log('search',data)
          const handleSearchChange = async (e) => {
            const newSearchText = e.target.value;
            setSearchText(newSearchText);
        
       
            dispatch(setUsersList([...data]));
          };
        
          const handleSearch = async (e)=>{
           e.preventDefault()
          setSearchText(searchText)
        

          dispatch(setUsersList([...data]));           

          }
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
     {userInfo && userInfo.role === 'admin' && <Form className="d-flex w-100 me-3"  onSubmit={(e) => { e.preventDefault(); handleSearch(e); }}>
                  <Form.Control 
                    type="search"
                    placeholder="Search"
                    className="me-2 w-100" 
                    aria-label="Search"
                    value={searchText}
                    onChange={handleSearchChange}
                    
                    
                  />
                  <Button variant="outline-success" onClick={handleSearch}>Search</Button>
                </Form> }
      <div className='me-5'>    {userInfo?( <Avatar name={userInfo.username} size="50" round={true} />):(<Avatar name="User" size="50" round={true} />)}</div>
  
    </Navbar>
    </div>
  )
}

export default Header