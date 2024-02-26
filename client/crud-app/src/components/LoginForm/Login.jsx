import React, { useState,useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../app/slices/userApiSlice';
import { setCredentials } from '../../app/slices/authSlice';
import { showToastSuccess,showToastError } from '../../services/toastServices';
import Loader from '../Loader';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const navigate = useNavigate()
  
  const dispatch = useDispatch()
  const [login,{isLoading}] = useLoginMutation()
  const {userInfo} = useSelector((state)=>(state.auth))
  useEffect(()=>{
     if(userInfo){
         navigate('/',{replace:true})
     }
  },[userInfo])
 const handleSubmit = async (e)=>{
  e.preventDefault()
  try {
          const res = await login({email,password}).unwrap()
          dispatch(setCredentials({...res}))
         
          showToastSuccess('Login successful');
          navigate('/',{replace:true})
          
  } catch (err) {
          showToastError('Invalid credentials');
  }
 
 

 }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      
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
      {isLoading && <Loader/>}
      <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
     
    </div>
  );
};
