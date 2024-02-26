import React, { useEffect, useState } from 'react';
import { registerUser } from '../../services/userServices';
import { showToastSuccess,showToastError } from '../../services/toastServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../app/slices/userApiSlice';
import { setCredentials } from '../../app/slices/authSlice';

export const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userInfo} = useSelector(state=>state.auth)
  const [register,{isLoading}] = useRegisterMutation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUserName] = useState('');
   useEffect(()=>{
    if(userInfo) navigate('/')
   },[navigate,userInfo])
 const handleSubmit = async (e)=>{
  e.preventDefault()
  try {
    const res = await register({email,username,password}).unwrap()
    dispatch(setCredentials({...res}))
    if(res)  showToastSuccess('Registration successful');
  } catch (error) {
    showToastSuccess('Registration unsuccessful');
    console.log(error)
  }

 }
  return (
    <div>
      {isLoading?(<h2>Loading...</h2>):
      (<form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='btn btn-primary' type='submit'>Submit</button>
      </form>)}
     
    </div>
  );
};
