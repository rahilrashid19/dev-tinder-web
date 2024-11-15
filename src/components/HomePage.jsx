import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./auth-components/Signup";
import Feed from "./Feed";
import Login from "./auth-components/Login";
import Footer from "./Footer";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default HomePage;
