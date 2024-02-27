import './App.css'

import { ToastContainer } from 'react-toastify';

import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Header from './components/Header';
import ProfileScreen from './Screens/ProfileScreen';
import AddProfileScreen from './Screens/AddProfileScreen';

function App() {
  return (
    <>
    <div>
      <Header/>
    <ToastContainer />
    </div>
      <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen/>}/>
          <Route path='/profile' element={<ProfileScreen/>}/>
          <Route path='/addProfile' element={<AddProfileScreen/>}/>
          
     
      </Routes>

 
 
    </>
  );
}

export default App;
