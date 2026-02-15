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
  //  const [title, settitle] = useState();
  //  useEffect(() =>{
  //   async function FetchingData(){
  //     const res = await fetch('https://pteahbay-api.cheatdev.online/food-items');
  //     const data = await res.json();
  //     const titleFromApi = data.map(data => data.title);
  //     setTitle(titleFromApi);
  //     return titleFromApi;
  //   }
  //   FetchingData();
  //  },[])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
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
