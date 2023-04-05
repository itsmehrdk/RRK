import React from 'react'
import {Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import Login from './Login'
import Home from './Home'
import './App.css'
const App = ()=> {
  const user=localStorage.getItem('myInfo')
  
  return (
    <div className="App">

 <Routes>
<Route path='/' element={<SignUp/>} />
<Route path='/home' element={<Home/>} />
<Route path='/login' element={<Login/>} />
</Routes> 
    </div>
    );
  };
export default App;