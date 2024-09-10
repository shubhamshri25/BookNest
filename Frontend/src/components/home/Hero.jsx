import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" h-[79vh] flex flex-col md:flex-row items-center justify-center">
      {/* left div */}
      <div className=" w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className=" text-4xl lg:text-6xl font-semibold text-yellow-100 lg:text-left text-center">
          Discover Your Next Great Read
        </h1>

        <p className="mt-4 text-xl text-zinc-300 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection
        </p>

        <div className="mt-8">
          <Link
            to="/all-books"
            className=" text-xl lg:text-2xl font-semibold text-yellow-100 border border-yellow-100 px-10 py-3  hover:bg-zinc-800 rounded-full"
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* Right div */}
      <div className=" w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img className=" max-w-80 md:max-w-lg" src="./book.png" alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
