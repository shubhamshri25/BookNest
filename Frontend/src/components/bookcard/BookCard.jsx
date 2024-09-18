import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BookCard = ({ data, favourite, setFavBooks }) => {
  // console.log(data)

  const api = import.meta.env.VITE_BACKEND_API;

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // remove from favourite
  const removeFromFavourite = async () => {
    try {
      if (!token || !id) {
        toast.error("User not authenticated");
        return;
      }

      const response = await axios.delete(
        `${api}/user/delete-from-favourite/${data._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      // Update the favourite books list after removal
      setFavBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== data._id)
      );
    } catch (error) {
      console.error("Error getting books: ", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-zinc-900 flex flex-col rounded p-4 text-center">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center ">
          <img src={data.url} alt="/" className="h-[25vh]" />
        </div>
        <h2 className=" mt-4 text-xl text-zinc-200 font-semibold ">
          {data.title}
        </h2>
        <p className="mt-2 text-zinc-400 font-semibold "> by {data.author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">{data.price}</p>
      </Link>
      <div />
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 hover:bg-yellow-100 mt-4"
          onClick={removeFromFavourite}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;
