import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  // Initialize AOS with slower, more visible settings
  useEffect(() => {
    AOS.init({
      duration: 1200,       // Slower animation duration (1.2 seconds)
      easing: 'ease-out-cubic',
      once: true,          // Animation happens only once
      mirror: false,       // Don't animate out on scroll up
      offset: 50,          // Trigger animations earlier (50px from viewport)
      delay: 0,            // No global delay
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/author" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
        <Route path="/item-details" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;













