import React, { useState } from 'react';

const BookCarousel = ({ books, category }) => {
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
        <div className="flex overflow-x-scroll pb-4">
          {books.slice(currentIndex, currentIndex + 7).map((book) => (
            <div key={book.id} className="min-w-[200px] mx-2">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail}
                alt={book.volumeInfo.title}
                className="w-48 h-64 object-cover mx-auto"
              />
              <p className="text-center font-semibold italic">Title:{book.volumeInfo.title}</p>
              <p className="text-center italic">{book.volumeInfo.authors?.join(', ')}</p>
              <p className="text-center font-semibold">{book.volumeInfo.publishedDate}</p>
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
          <button onClick={handlePrevClick} className="bg-rose-400 text-white p-2 rounded-full">
          ◄
          </button>
        </div>

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
