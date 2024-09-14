import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/About";
import AllBooks from "./pages/AllBooks";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/viewbookDetails/ViewBookDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
