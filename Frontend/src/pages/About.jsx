import React from "react";

const About = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 min-h-screen lg:min-h-[82vh] bg-zinc-900">
      <div className="container mx-auto px-4 lg:px-0 max-w-4xl text-white text-center pt-8 lg:pt-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
          About BookNest
        </h2>
        <p className="text-base md:text-lg lg:text-xl mb-4">
          Welcome to <strong className="text-orange-500">BookNest</strong>, your
          cozy corner for discovering and purchasing a wide variety of books!
          Whether you're a lover of fiction, history, or science, we offer a
          carefully curated selection to meet your literary desires.
        </p>
        <p className="text-base md:text-lg lg:text-xl mb-4">
          At BookNest, we believe in the magic of stories and knowledge. Our
          mission is to provide readers of all ages with access to both popular
          and rare books in a comfortable, user-friendly environment.
        </p>
        <p className="text-base md:text-lg lg:text-xl mb-4">
          Nestle in and start your reading journey with us today!
        </p>
        <p className="text-base md:text-lg lg:text-xl mt-6 md:mt-8">
          <strong>Contact us:</strong>
          <br />
          Email:{" "}
          <a href="mailto:support@booknest.com" className="text-orange-500">
            support@booknest.com
          </a>
          <br />
          Phone: <span className="text-orange-500">(123) 456-7890</span>
        </p>
      </div>
    </section>
  );
};

export default About;
