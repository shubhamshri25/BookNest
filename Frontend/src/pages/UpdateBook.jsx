import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    desc: "",
    price: "",
    language: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const api = import.meta.env.VITE_BACKEND_API;

  const token = localStorage.getItem("token");

  // handel change
  const handelChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // get book detail
  const getBookDetail = async () => {
    try {
      const response = await axios.get(`${api}/books/book-by-id/${id}`);
      // console.log(response.data);
      setData(response.data.book);
    } catch (error) {
      console.error("Error getting books: ");
      toast.error("Failed to fetch book details. Please try again later.");
    }
  };

  // add book function
  const editBook = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        toast.error("All fields are required");
      } else {
        const response = await axios.put(
          `${api}/admin/book/update-book/${id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData({
          url: "",
          title: "",
          author: "",
          desc: "",
          price: "",
          language: "",
        });
        toast.success(response.data.message);
        navigate("/all-books")
      }
    } catch (error) {
      console.error("Error adding book: ", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getBookDetail();
  }, []);

  return (
    <>
      <div className="h-[100%] bg-zinc-900 p-0 md:p-4">
        <h1 className="text-3xl md:text-5xl  font-semibold mb-8 text-zinc-500">
          Update Book
        </h1>
        <div className="bg-zinc-800 p-4 rounded">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Image
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none  "
              name="url"
              placeholder="url of image"
              required
              value={data.url}
              onChange={handelChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Title
            </label>
            <input
              type="text"
              className=" w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none  "
              name="title"
              placeholder="title of book"
              required
              value={data.title}
              onChange={handelChange}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              author
            </label>
            <input
              type="text"
              className=" w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none  "
              name="author"
              placeholder="author of book"
              required
              value={data.author}
              onChange={handelChange}
            />
          </div>

          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">
                Price
              </label>
              <input
                type="number"
                className=" w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none  "
                name="price"
                placeholder="price of book"
                required
                value={data.price}
                onChange={handelChange}
              />
            </div>

            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">
                Language
              </label>
              <input
                type="text"
                className=" w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none  "
                name="language"
                placeholder="language of book"
                required
                value={data.language}
                onChange={handelChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Desciption
            </label>
            <textarea
              rows={4}
              type="text"
              className=" w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none  "
              name="desc"
              placeholder="desciption of book"
              required
              value={data.desc}
              onChange={handelChange}
            />
          </div>
          <button
            onClick={editBook}
            className="px-3 mt-4 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-200"
          >
            Update Book
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateBook;
