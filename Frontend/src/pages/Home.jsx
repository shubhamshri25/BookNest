import React from "react";
import Hero from "../components/home/Hero";
import RecentlyAdded from "../components/home/RecentlyAdded";

const Home = () => {
  return (
    <h1 className="bg-zinc-900 text-white px-10 py-8">
      <Hero />
      <RecentlyAdded />
    </h1>
  );
};

export default Home;
