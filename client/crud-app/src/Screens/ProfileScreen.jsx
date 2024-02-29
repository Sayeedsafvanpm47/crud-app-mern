import React, { useEffect } from 'react'
import Profile from '../components/Profile'

import useAuthRedirect from '../app/hooks/useAuthRedirect'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfileScreen = () => {
const {userInfo} = useSelector(state=>state.auth)
const navigate = useNavigate()


  useEffect(() => {
    console.log(userInfo)
    if (userInfo == null) {
      navigate('/', { replace: true });
    }
  }, [userInfo, navigate]);


  return (
    <div>
          <Profile/>
    </div>
  )
}

export default ProfileScreen