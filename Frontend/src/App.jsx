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
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Favourites from "./components/profile/Favourites";
import UserOrderHistory from "./components/profile/UserOrderHistory";
import Settings from "./components/profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

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

        <Route path="/profile" element={<Profile />}>
          {role === "user" && (
            <>
              <Route index element={<Favourites />} />
              <Route path="orderHistory" element={<UserOrderHistory />} />
              <Route path="settings" element={<Settings />} />
            </>
          )}

          {/* Routes for Admins */}
          {role === "admin" && (
            <>
              <Route index element={<AllOrders />} />
              <Route path="add-book" element={<AddBook />} />
              <Route path="update-book/:id" element={<UpdateBook />} />
            </>
          )}
        </Route>

        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
