// // src/components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   return (
//     <header className="bg-blue-600 text-white p-4">
//       <nav className="container mx-auto flex justify-between">
//         <Link to="/" className="text-xl font-bold">Car Dealership</Link>
//         <div>
//           <Link to="/login" className="mr-4">Login</Link>
//           <Link to="/register" className="mr-4">Register</Link>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;



import { Link} from "react-router-dom";
import React from 'react'


 const Navbar = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div>
      <div className='toggle' >
        <label htmlFor="check">
        <span></span>
        <span></span>
        <span></span>
        </label>
       
      </div>
      <input type="checkbox" id="check" />
        <ul className="nav" >
            <li> <Link to="/" className='a'>Home</Link> </li>
           
          
           
           
            <li> <Link to="/profile" className='a'>Profile</Link> </li>
           
            <li> <Link to="/dealership" className='a'>Dealership</Link> </li>
            <li> <Link to="/login" className='a'>Login</Link> </li>
           
            <li> <Link to="/register" className='a'>Sign Up</Link> </li>
            <li> <Link to="/updatepassword" className='a'>UpdatePassword</Link> </li>
          <button onClick={handleLogout}>Logout</button>
           
            
        </ul>
        
    </div>

  )
}
export default  Navbar;




// export default Navbar;
