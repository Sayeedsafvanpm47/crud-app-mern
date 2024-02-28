import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from 'react-avatar'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useSearchUsersQuery } from '../app/slices/adminApiSlice';
import { setUsersList } from '../app/slices/usersResultSlice';
import { logout } from '../app/slices/authSlice'
import { useLogoutMutation } from '../app/slices/userApiSlice'

const Header = () => {
         
          const [searchText,setSearchText] = useState('')
          const {data} = useSearchUsersQuery(searchText)
          const dispatch = useDispatch()
          console.log('search',data)
          const [logoutApiCall] = useLogoutMutation()

 
          const logoutHandler = async ()=>{
            try {
              Swal.fire({
                title: "Are you sure?",
                text: "You are going to logout",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Logout"
              }).then(async (result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Logout",
                    text: "Logout success",
                    icon: "success"
                  });
                  await logoutApiCall().unwrap();
                  dispatch(logout());
                
                  navigate("/login", { replace: true });
                }
              }); } catch (error) {
                console.log(error);
              }
          }

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
              <NavDropdown.Item onClick={logoutHandler}>
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
      <div className='me-5'>         {userInfo && userInfo.profilePic ? (<Avatar style={{border:'1px solid'}} src={`https://res.cloudinary.com/dkxyzzuss/image/upload/${userInfo.profilePic}`} name={userInfo.username} size="60" round={true} />) : (<Avatar style={{border:'1px solid'}} name={userInfo ? userInfo.username:'user'} size="60" round={true} />)}
</div>
  
    </Navbar>
    </div>
  )
}

export default Header