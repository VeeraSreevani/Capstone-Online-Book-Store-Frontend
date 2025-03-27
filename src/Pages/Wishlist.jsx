import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = ({ userId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch wishlist on component mount
  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  // Fetch wishlist data from backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/wishlist/${userId}`);
      console.log(response.data);
      setWishlist(response.data.wishlistItems);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch wishlist');
      setLoading(false);
    }
  };

  // Add book to the wishlist
  const addToWishlist = async (bookId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/wishlist', { userId, bookId }`);
      alert(response.data.message);
      fetchWishlist(); // Refresh wishlist after adding
    } catch (err) {
      alert('Failed to add book to wishlist');
    }
  };

  // Remove book from the wishlist
  const removeFromWishlist = async (bookId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/wishlist/${userId}/${bookId}`);
      alert(response.data.message);
      fetchWishlist(); // Refresh wishlist after removal
    } catch (err) {
      alert('Failed to remove book from wishlist');
    }
  };

  // Update wishlist item (e.g., change status, etc.)
  const updateWishlistItem = async (bookId, updates) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/wishlist/${userId}/${bookId}`, updates);
      alert('Wishlist updated');
      fetchWishlist(); // Refresh wishlist after update
    } catch (err) {
      alert('Failed to update wishlist item');
    }
  };

  // Render wishlist items
  return (
    <div>
      <h1>Your Wishlist</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : wishlist?.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist?.map((item) => (
            <li key={item.bookId}>
              <div>
                <h3>{item.title}</h3>
                <p>By: {item.authors?.join(',')}</p>
                <img src={item.thumbnail} alt={item.title} />
                <button onClick={() => removeFromWishlist(item.bookId)}>Remove</button>
                <button onClick={() => updateWishlistItem(item.bookId, { status: 'purchased' })}>Mark as Purchased</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button onClick={() => addToWishlist('')}>
          Add a Book to Wishlist
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
