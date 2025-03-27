import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import BookCarousel from '../components/BookCarousal';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [bestSellerBooks, setBestSellerBooks] = useState([]);
  const [recentlyAddedBooks, setRecentlyAddedBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const navigate = useNavigate();
  const userId = '67df566f898b12f273c87351';

  // Fetch books for each category
  useEffect(() => {
    // Fetch Best Seller Books
    const fetchBestSellerBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=best+sellers');
        setBestSellerBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching Best Seller books:', error);
      }
    };

    // Fetch Recently Added Books
    const fetchRecentlyAddedBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=new+arrivals');
        setRecentlyAddedBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching Recently Added books:', error);
      }
    };

    // Fetch Fiction Books
    const fetchFictionBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=fiction');
        setFictionBooks(response.data.items || []);
      } catch (error) {
        console.error('Error fetching Fiction books:', error);
      }
    };

    // Fetch data for all categories
    fetchBestSellerBooks();
    fetchRecentlyAddedBooks();
    fetchFictionBooks();
  }, []);

  // Handle search (if needed)
  const handleSearch = async (query) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    // Update your books state based on search
    setBestSellerBooks(response.data.items || []); 
  };
    // Handle adding to wishlist
    const handleAddToWishlist = async (book) => {
        console.log(book);
        const{bookId,title,authors,imageLinks}=book
        try {
          const response = await axios.post('/api/wishlist', {
            userId,
            bookId,
            title,
            authors,
            thumbnail: imageLinks?.thumbnail,
          });
          console.log('Book added to wishlist:', response.data);
        } catch (error) {
          console.error('Error adding book to wishlist:', error);
        }};

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-3xl font-bold text-center my-4">Welcome to the Bookstore</h1>

         {/* Carousel for Fiction */}
        <BookCarousel books={fictionBooks} category="Fiction" onAddToWishlist={handleAddToWishlist} />

        {/* Carousel for Best Seller */}
        <h2 className="text-1xl font-semibold mt-8 mb-4">Best Seller</h2>
        <BookCarousel books={bestSellerBooks} category="Best Seller" onAddToWishlist={handleAddToWishlist}/>

        {/* Carousel for Recently Added */}
        <h2 className="text-1xl font-semibold mt-8 mb-4">Recently Added</h2>
        <BookCarousel books={recentlyAddedBooks} category="Recently Added" onAddToWishlist={handleAddToWishlist}/>

        {/* Carousel for Fiction */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Non-Fiction</h2>
        <BookCarousel books={fictionBooks} category="Fiction" onAddToWishlist={handleAddToWishlist}/>
        
        {/* have to work on Pagination */}
      </div>
    </div>
  );
};

export default Homepage;
