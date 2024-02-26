import React from 'react'

import Container from 'react-bootstrap/Container';

import '../components/Home/Home.css'

import AdminHomeComp from './AdminHomeComp'
import UserHomeComp from './UserHomeComp'

import { useSelector } from 'react-redux';

const Home = () => {
 
  const {userInfo} = useSelector(state=>state.auth)


 

  return (
    <div>
      
      <Container>
       { userInfo.role === 'admin' ? (<div><AdminHomeComp/></div>) : (<div><UserHomeComp/></div>)}
    
      </Container>
    
    </div>
  )
}

export default Home