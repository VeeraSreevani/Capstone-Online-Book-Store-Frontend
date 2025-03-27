import React, { useState } from "react";

const BookManagement = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author: "" });
    const [editingBook, setEditingBook] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const addBook = () => {
        if (newBook.title && newBook.author) {
            setBooks([...books, { ...newBook, id: Date.now() }]);
            setNewBook({ title: "", author: "" });
        }
    };

    const deleteBook = (id) => {
        setBooks(books.filter((book) => book.id !== id));
    };

    const startEditing = (book) => {
        setEditingBook(book);
    };

    const updateBook = () => {
        setBooks(
            books.map((book) =>
                book.id === editingBook.id ? editingBook : book
            )
        );
        setEditingBook(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditingBook({ ...editingBook, [name]: value });
    };

    return (
        <div>
            <h1>Book Management</h1>
            <div>
                <h2>Add Book</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleInputChange}
                />
                <button onClick={addBook}>Add</button>
            </div>

            <div>
                <h2>Books List</h2>
                {books.map((book) => (
                    <div key={book.id}>
                        {editingBook && editingBook.id === book.id ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={editingBook.title}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="author"
                                    value={editingBook.author}
                                    onChange={handleEditChange}
                                />
                                <button onClick={updateBook}>Update</button>
                            </div>
                        ) : (
                            <div>
                                <span>
                                    {book.title} by {book.author}
                                </span>
                                <button onClick={() => startEditing(book)}>Edit</button>
                                <button onClick={() => deleteBook(book.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookManagement;