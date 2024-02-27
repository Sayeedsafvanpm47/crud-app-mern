import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../app/slices/userApiSlice'
import { logout } from '../app/slices/authSlice'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from './PostCard'
import '../components/Home/Home.css'


const UserHomeComp = () => {
 
  const {userInfo} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutApiCall] = useLogoutMutation()

 
  const logoutHandler = async ()=>{
   try {
          await logoutApiCall().unwrap()
          dispatch(logout())
          alert('logout success')
          navigate('/login', { replace: true });
          
   } catch (error) {
          console.log(error)
   }
  }
  return (
    <div>
      
      <Container>
       <Row className='d-flex userWelcomeRow'>
          <Col className='d-flex userWelcome'>
        <p className='mt-3'>  Hello Welcome  {userInfo ? userInfo.username : 'user' } to home
           <br />
         <a onClick={logoutHandler}> {userInfo?'Logout': 'login to continue'}</a></p>  </Col>
        </Row>

      {userInfo &&  <Row>
          <Col className='d-flex scrollPosts' style={{ overflowX: 'auto' }}>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          <PostCard/>
          </Col>
        </Row>}
     
         
      </Container>
    
    </div>
  )
}

export default UserHomeComp