import React from 'react'
import Profile from '../components/Profile'

import useAuthRedirect from '../app/hooks/useAuthRedirect'

const ProfileScreen = () => {
useAuthRedirect()
  return (
    <div>
          <Profile/>
    </div>
  )
}

export default ProfileScreen