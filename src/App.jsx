import React from 'react';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import './index.css';
// import './tailwind.css';
import axios from 'axios';  
import Carousal from './components/BookCarousal';
// import Pagination from './components/Pagination';
import BookSearch from './components/BookSearch';
import Navbar from './components/Navbar';
import header from './components/header';
import Cart from './Pages/Cart';
import Homepage from './Pages/Homepage';
import Wishlist from './Pages/Wishlist';
import Searchpage from './Pages/Searchpage';
import LoginForm from './Pages/LoginForm';
import Profile from './Pages/Profile';
import  Books  from './Pages/Books';

function App() {
  const [books,setBooks] = useState([]);
  const userId = '67df566f898b12f273c87351';
  const handleAddToWishlist = async (book) => {
    try {
      const response = await axios.post('/wishlist', { userId, bookId: book.id });
      alert('Book added to wishlist!');
      // Optionally, you could also update the wishlist state here
    } catch (err) {
      alert('Failed to add book to wishlist');
    }
  };

  return (
   <div>
    {/* <header/> */}
      {/* <Navbar/> */}
      <nav>
        <a href="/">🏠</a>
        {/* <a href="/login">Login</a>  */}
        
      </nav>
      <Routes>
        <Route path="/" element={<Homepage onAddToWishlist={handleAddToWishlist}/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist userId={userId}/>}/>
        <Route path="/search" element={<Searchpage/>}/>
        <Route path="/login" element={<LoginForm/>}/> 
        <Route path="/user" element={<Profile/>}/>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:category" element={<Books />} />
      </Routes>  
    </div>
  )
}

export default App



{/* <>
<div>
  <a href="https://vite.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</div>
<h1>Vite + React</h1>
<div className="card">
  <button onClick={() => setCount((count) => count + 1)}>
    count is {count}
  </button>
  <p>
    Edit <code>src/App.jsx</code> and save to test HMR
  </p>
</div>
<p className="read-the-docs">
  Click on the Vite and React logos to learn more
</p>
</> */}