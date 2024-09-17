import React, { useState, useEffect } from "react";
import Loader from "../components/loader/Loader";
import BookCard from "../components/bookcard/BookCard";
import { toast } from "react-toastify";
import axios from "axios";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  const api = import.meta.env.VITE_BACKEND_API;

  // getting all the books
  const getAllBooks = async () => {
    try {
      const response = await axios.get(`${api}/books/all-books`);
      // console.log(response.data);
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error getting books: ", books);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <>
      <div className="bg-zinc-900 px-12 h-auto py-8 ">
        <h4 className="text-3xl text-yellow-100 text-center ">All Books</h4>
        {!books && (
          <div className="w-full h-screen flex items-center justify-center ">
            <Loader />
          </div>
        )}
        <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
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

export default AllBooks;
