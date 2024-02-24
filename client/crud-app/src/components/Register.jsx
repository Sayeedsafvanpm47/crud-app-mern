import React, { useState } from 'react';
import axios from 'axios'

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUserName] = useState('');

 const fetchUser = (e)=>{
  e.preventDefault()
  const userData = {
    email: email,
    password: password,
  };
  axios.post('http://localhost:3000/api/register',userData)
  .then((res)=>{
    alert('Registration successful!');
  })
 }
  return (
    <div>
      <form onSubmit={(e)=>fetchUser(e)}>
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
      <button type='submit'>Submit</button>
      </form>
     
    </div>
  );
};
