import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import Category from "./pages/Category";
import FoodDetail from "./pages/FoodDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import Footer from "./components/layout/Footer";

export default function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  //  <>
  //  <p>Title : {title}</p>
  //   </>

  );
}
