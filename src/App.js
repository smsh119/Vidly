import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-Found";
import Navbar from "./components/navbar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [user, setUser] = useState();
  const location = useLocation();
  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);
  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar user={user} />
      <main className="container">
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route
            path="/movies/:id"
            element={
              !user ? (
                <Navigate to="/login" state={{ prevUrl: location.pathname }} />
              ) : (
                <MovieForm />
              )
            }
          /> */}
          <Route path="movies/:id" element={<MovieForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/movies" element={<Movies user={user} />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/not-Found" element={<NotFound />} />
          <Route path="/" element={<Navigate from="/" to="/movies" />} />
          <Route path="/*" element={<Navigate to="/not-Found" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
