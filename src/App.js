import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter ,Routes, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
// import Dealership from './pages/Dealership';
import Navbar from './components/Navbar';
import Dealership from './pages/Dealership';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  return (
    // <BrowserRouter >
    //   <Navbar />
    //   <div className="container mx-auto mt-4">
    //     <Routes>
    //       <Route path="/" exact element={Home} />
    //       <Route path="/register" element={Register} />
    //       <Route path="/login" element={Login} />
    //       {/* <Route path="/profile" component={Profile} /> */}
    //       {/* <Route path="/dealership" component={Dealership} /> */}
    //     </Routes>
    //   </div>
    // </BrowserRouter>

    // <div>
    //   {/* <Header /> */}
    //   {/* <Register/> */}
    // <Login/>
    // </div>

    <BrowserRouter>
    <Navbar/>
     <Routes>
     <Route path='/' element={<Home/>} ></Route>
       
        <Route path='/register' element={<Register/>} ></Route>
       
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/dealership' element={<Dealership/>} ></Route>
        <Route path='/profile' element={<Profile/>} ></Route>
        <Route path='/updatepassword' element={<UpdatePassword/>} ></Route>
     

     </Routes>
 </BrowserRouter>
   
  );
}

export default App;
