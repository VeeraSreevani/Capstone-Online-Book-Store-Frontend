import React, { useState } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch books from Google Books API
    const fetchBooks = async () => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`
            );
            const data = await response.json();
            setSearchResults(data.items || []);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Add book to cart
    const addToCart = (book) => {
        setCartItems((prevItems) => [...prevItems, book]);
    };

    // Remove book from cart
    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    // Update book in cart
    const updateCartItem = (index, updatedBook) => {
        setCartItems((prevItems) =>
            prevItems.map((item, i) => (i === index ? updatedBook : item))
        );
    };

    return (
        <div>
            <h1>Shopping Cart</h1>

            {/* Search Section */}
            <div>
                <input
                    type="text"
                    placeholder="Search for books"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={fetchBooks}>Search</button>
            </div>

            {/* Search Results */}
            <div>
                <h2>Search Results</h2>
                {searchResults.map((book) => (
                    <div key={book.id}>
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.authors?.join(', ')}</p>
                        <button onClick={() => addToCart(book)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {/* Cart Items */}
            <div>
                <h2>Cart Items</h2>
                {cartItems.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index}>
                            <h3>{item.volumeInfo.title}</h3>
                            <p>{item.volumeInfo.authors?.join(', ')}</p>
                            <button onClick={() => removeFromCart(index)}>Remove</button>
                            <button
                                onClick={() =>
                                    updateCartItem(index, {
                                        ...item,
                                        volumeInfo: {
                                            ...item.volumeInfo,
                                            title: item.volumeInfo.title + ' (Updated)',
                                        },
                                    })
                                }
                            >
                                Update
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Cart;
