import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Searchpage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const apiKey = import.meta.env.VITE_GOOGLEBOOK_API_KEY;
//   const searchTerms = searchParams.get("q")||'';

  // Sync searchTerm with searchParams
  useEffect(() => {
    const term = searchParams.get("q") || '';
    setSearchTerm(term);
  }, [searchParams]);

  const getBooks = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null); // Reset error on new search
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
      );
      const data = await res.json();
      console.log(data);
      setBooks(data.items || []);
    } catch (e) {
        console.error( e);
        setError("Something went wrong. Please try again.");
        setBooks([]);  // Reset books in case of error
      } finally {
        setLoading(false); 
      }
    };

     // Trigger search on searchTerm change
  useEffect(() => {
    if (searchTerm.trim()) {
        getBooks();
      }
    }, [searchTerm]);


  const addToWishlist = (book) => {
    setWishlist([...wishlist, book]);
    alert(`${book.volumeInfo.title} has been added to your wishlist!`);
  };


  return (
    <div>
        <h1>Search Results for "{searchTerm}"</h1>
        {/* Loading Indicator */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}
        
      {/* Display Books */}
      {books.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, index) => {
            const {
              title,
              authors,
              publisher,
              publishedDate,
              imageLinks,
              previewLink,
            } = book.volumeInfo;

            const bookImage =
              imageLinks?.thumbnail || "https://via.placeholder.com/150";

            return (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-lg bg-white transition-transform hover:scale-105"
              >
                <img
                  className="w-full h-40 object-cover rounded mb-3"
                  src={bookImage}
                  alt={title}
                />
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-600 truncate">
                  <strong>Author:</strong> {authors?.join(", ") || "Unknown"}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  <strong>Publisher:</strong> {publisher || "Unknown"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Published:</strong> {publishedDate || "N/A"}
                </p>
                <div className="flex justify-between mt-3">
                  <a
                    href={previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Preview 📖
                  </a>
                  <button
                    onClick={() => addToWishlist(book)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    ❤️ Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="text-center text-gray-500 text-xl">
            {loading ? "Loading..." : "No books to display"}
        </h1>
      )}
    </div>
  );
}

export default Searchpage;
