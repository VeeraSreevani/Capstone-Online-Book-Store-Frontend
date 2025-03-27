import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Books = () => {
  const { category } = useParams();  // Get category from URL parameter
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks(category);
  }, [category]);

  const fetchBooks = (category) => {
    const apiKey = 'import.meta.env.VITE_GOOGLEBOOK_API_KEY'; 
    setLoading(true);
    setError(null);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items || []);  
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching books");
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-list">
      <h2>Books in {category} Category</h2>
      <div className="grid grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="book-card bg-white p-4 rounded-md shadow-md">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="w-50 h-70 object-cover mx-auto"
            />
            <h3 className="font-semibold mt-2 text-center">{book.volumeInfo.title}</h3>
            <p className="text-sm text-center">{book.volumeInfo.authors?.join(", ")}</p>
            <a
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 hover:underline mt-2 block text-center"
            >
              More Info
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
