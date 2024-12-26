import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Men from "./component/Men/Men";
import Women from "./component/Women/Women";
import Signup from "./component/Login/Signup"; 
import UserList from "./AdminSahil/UserManagement";
import Products from "./AdminSahil/ProductManagement";
import AdminSahil from "./AdminSahil/AdminRoutes1";
import Cart from "./component/Men/Cart";
import Production from "./component/Men/Production";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/men" element={<Men />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/women" element={<Women />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/products" element={<Products />} />
      <Route path="/production" element={<Production />} />
      <Route path="/admin" element={<AdminSahil />} />
    </Routes>
  );
}

export default App;
