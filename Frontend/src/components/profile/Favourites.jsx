import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import BookCard from "../bookcard/BookCard";

const Favourites = () => {
  const [favBooks, setFavBooks] = useState([]);

  const api = import.meta.env.VITE_BACKEND_API;

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // get all fabourites books
  const getAllFavourites = async () => {
    try {
      if (!token || !id) {
        toast.error("User not authenticated");
        return;
      }

      const response = await axios.get(
        `${api}/user/show-all-favourite-books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data.favouriteBooks);

      setFavBooks(response.data.favouriteBooks);
    } catch (error) {
      console.error("Error getting books: ", error);
    }
  };

  useEffect(() => {
    getAllFavourites();
  }, [favBooks]);

  return (
    <>
      {favBooks.length === 0 && (
        <div className="text-5xl font-semibold text-zinc-500 flex items-center justify-center w-full">
          No favourite Books
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {favBooks &&
          favBooks.map((currBook, index) => (
            <div key={index}>
              <BookCard
                data={currBook}
                favourite={true}
                setFavBooks={setFavBooks}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
