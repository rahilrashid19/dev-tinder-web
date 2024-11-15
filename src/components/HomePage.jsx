import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Signup from "./auth-components/Signup";
import Feed from "./Feed";
import Login from "./auth-components/Login";
import Footer from "./Footer";

const HomePage = () => {
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
