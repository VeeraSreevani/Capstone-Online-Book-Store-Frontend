import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //func to handle search
  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?q=${searchTerm}`);
    }
  };
  return (
    <div>
      <p className="scrolling">Get FREE Shipping Everyday, Every Order </p>
      <nav className="flex items-center justify-between px-6 py-4 bg-pink-500">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold italic">
            Veera's📚BookBuddies
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex ml-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search books by Title, Author..."
            className="border rounded p-3 w-120"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-cyan-500 text-white px-2 py-2 rounded hover:bg-blue-500">
            🔍 Search
          </button>
        </div>
        {/* Wishlist & Cart*/}
        <div className="flex items-center space-x-4">
          <Link to="/user" className="hover:underline">Admin</Link>
          <Link to="/login" className="hover:underline">SignUp</Link>

          {/* <Link to='/signUp' className='hover:underline'>Sign-Up</Link> */}
          <Link to="/wishlist" className="hover:underline">
            ❤️ WishList
          </Link>
          <Link to="/cart" className="hover:underline">
            🛒 Cart
          </Link>
        </div>
      </nav>
      <p className="scrolling">SALE! 50% off on all books! Use code: BOOKBUDDIES50</p>
    {/* Category Navbar */}
      <nav className=" flex items-center justify-between px-6 py-4 bg-pink-400 text-black">
        <div className="flex space-x-4 px-6">
          <Link to="/books" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Books
          </Link>
          <Link to="/books/fiction" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Fiction
          </Link>
          <Link to="/books/nonfiction" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Non-Fiction
          </Link>
          <Link to="/books/kids" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Kids
          </Link>
          <Link to="/books/teens" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Teens & Young Age
          </Link>
          <Link to="/ebooks" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            E-Books
          </Link>
          <Link to="/books/funco" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Funko
          </Link>
          <Link to="/books/toys" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Toys & Games
          </Link>
          <Link to="/books/gifts" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            Gift Shop
          </Link>
          <Link to="/books" className="px-4 py-2 rounded-md font-semibold hover:bg-cyan-500">
            SALE
          </Link>
          {/* <button
                    onClick={() => handleTabChange('fiction')}
                    className={`${
                      activeTab === 'fiction' 
                    } px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200`}
                  >
                    Fiction
                  </button> */}
          {/* <button
                    onClick={() => handleTabChange('nonfiction')}
                    className={`${
                      activeTab === 'nonfiction' 
                    } px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200`}
                  >
                    Non-Fiction
                  </button>
                  <button
                    onClick={() => handleTabChange('kids')}
                    className={`${
                      activeTab === 'kids' 
                    } px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200`}
                  >
                    Kids
                  </button>
                  <button
                    onClick={() => handleTabChange('teens')}
                    className={`${
                      activeTab === 'teens'
                    } px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200`}
                  >
                    Teens & Young Age
                  </button>
                  <button
                    onClick={() => handleTabChange('ebooks')}
                    className={`${
                      activeTab === 'ebooks'
                    } px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-200`}
                  >
                    E-Books
                  </button> */}
          {/* <Link to="/wishlist" className="flex items-center space-x-4">
            ❤️ Favorites
          </Link> */}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
