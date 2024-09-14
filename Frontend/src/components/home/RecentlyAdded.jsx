import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../bookcard/BookCard";
import Loader from "../loader/Loader";

const RecentlyAdded = () => {
  const [books, setBooks] = useState([]);

  const api = `${import.meta.env.VITE_BACKEND_API}`;

  const getRecentBooks = async () => {
    try {
      const response = await axios.get(`${api}/books/recent-Books`);
      // console.log(response.data);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error getting Recently added books: ", books);
    }
  };

  useEffect(() => {
    getRecentBooks();
  }, []);

  return (
    <>
      <div className="mt-8 px-4">
        <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
        {!books && (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        )}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books &&
            books.map((currBook, index) => (
              <div key={index}>
                <BookCard data={currBook} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RecentlyAdded;
