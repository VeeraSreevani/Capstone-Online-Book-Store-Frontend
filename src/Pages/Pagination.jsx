
import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data based on currentPage and itemsPerPage
    const fetchData = async () => {
      const response = await fetch(`https://api.example.com/items?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      setItems(data.items);
    };

    fetchData();
  }, [currentPage]);

  const totalItems = 100; // Replace with the actual total number of items
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <h1>Items</h1>
      <div>
        {items.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default HomePage;
