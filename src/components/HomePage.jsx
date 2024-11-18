import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./auth-components/Signup";
import Feed from "./Feed";
import Login from "./auth-components/Login";
import Footer from "./Footer";
import Profile from "./Profile";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUsers } from "../utils/slices/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getLoggedInUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/viewProfile", {
        withCredentials: true,
      });
      dispatch(addUsers(user.data.user));
    } catch (error) {
      if (error.status === 401) {
        navigate("/");
      }
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <header className="sticky top-0 z-50 bg-white">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-[64px]">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {/* Fixed Footer */}
      <footer className="sticky bottom-0 z-50 bg-white">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
