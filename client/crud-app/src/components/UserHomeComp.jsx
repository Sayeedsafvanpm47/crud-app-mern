import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from './PostCard'
import '../components/Home/Home.css'
import Hero from './Hero';


const UserHomeComp = () => {
 
  const {userInfo} = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()


 

  return (
    <div>
      
      <Container>
       <Row className='d-flex userWelcomeRow'>
          <Col className='d-flex userWelcome'>
          
   </Col>
        </Row>
        <Hero></Hero>

      {userInfo &&  <Row>
          <Col className='d-flex scrollPosts' style={{ overflowX: 'auto' }}>
         
          <PostCard/>
          </Col>
        </Row>}
     
         
      </Container>
    
    </div>
  )
}

export default UserHomeComp