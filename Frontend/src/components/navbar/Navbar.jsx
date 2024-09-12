import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav
        className={` z-50 bg-zinc-800 text-white py-4 px-8 relative flex justify-between items-center`}
      >
        <div className="flex items-center ">
          <img
            className="h-10 me-4 "
            src="https://img.icons8.com/?&id=43633&format=png&color=000000"
            alt="logo"
          />
          <Link to="/" className="font-semibold text-2xl">
            BookNest
          </Link>
        </div>

        <div className=" block md:flex items-center gap-4">
          <div className=" hidden md:flex gap-4">
            {navLinks.map((currEle, index) => (
              <NavLink
                key={index}
                className=" hover:text-blue-500 transition-all duration-300"
                to={currEle.link}
              >
                {currEle.title}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 "
            >
              SignUp
            </Link>
          </div>

          <button
            className="hover:text-zinc-400 text-white text-2xl md:hidden block"
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center `}
      >
        {navLinks.map((currEle, index) => (
          <Link
            key={index}
            className={`${mobileNav} text-white text-4xl mb-4 font-semibold hover:text-blue-500 transition-all duration-300`}
            to={currEle.link}
            onClick={() =>
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {currEle.title}
          </Link>
        ))}

        <Link
          to="/login"
          className={`${mobileNav} px-8 mb-8 text-3xl py-2 font-semibold border text-white border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}
          onClick={() =>
            mobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden")
          }
        >
          Login
        </Link>
        <Link
          to="/signup"
          className={` ${mobileNav} px-8 mb-8 text-3xl py-2 font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 `}
          onClick={() =>
            mobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden")
          }
        >
          SignUp
        </Link>
      </div>
    </>
  );
};

export default Navbar;
