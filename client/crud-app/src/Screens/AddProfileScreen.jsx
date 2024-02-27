import React from 'react'
import AddProfile from '../components/AddProfile'
import useAuthRedirectAdmin from '../app/hooks/useAuthRedirectAdmin'

const AddProfileScreen = () => {

useAuthRedirectAdmin()
  return (
    <div><AddProfile/></div>
  )
}

export default AddProfileScreen