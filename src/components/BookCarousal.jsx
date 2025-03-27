import React, { useState } from 'react';
import {Link} from 'react-router-dom';

const BookCarousel = ({ books, category, onAddToWishlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 7 < 0 ? books.length - 7 : prevIndex - 7));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 7 >= books.length ? 0 : prevIndex + 7));
  };

  return (
    <div>
      <div className="relative">
        <h2 className='text-2xl font-semibold mb-4'>{category}</h2>
        <div className="flex overflow-x-scroll pb-4">
          {books.slice(currentIndex, currentIndex + 7).map((book) => (
            <div key={book.id} className="min-w-[200px] mx-2">
              <Link to={`/book/${book.id}`}>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-48 h-64 object-cover mx-auto"
                />
              </Link>
              <p className="text-center font-semibold italic">Title:{book.volumeInfo.title}</p>
              <p className="text-center italic">{book.volumeInfo.authors?.join(', ')}</p>
              <p className="text-center font-semibold">{book.volumeInfo.publishedDate}</p>

             {/* Wishlist Button */}
             <button
              className="mt-2 bg-rose-400 text-white py-1 px-4 rounded"
              onClick={() => onAddToWishlist({...book.volumeInfo,bookId:book.id})} // Add book to wishlist
            >
              ❤️ Add to Wishlist
            </button>
            </div>
          ))}
        </div>

          {/* LeftArrow */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button onClick={handlePrevClick} className="bg-rose-400 text-white p-2 rounded-full"> ◄ </button>
        </div>
          {/* Right Arrow */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
          <button onClick={handleNextClick} className="bg-rose-400 text-white p-2 rounded-full">
          &#x27A4;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCarousel;
