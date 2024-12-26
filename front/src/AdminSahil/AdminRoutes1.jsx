import { Link } from "react-router-dom";
import "./App.css";
import React from "react";

function AdminSahil() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">User Management</Link>
          </li>
          <li>
            <Link to="/products">Product Management</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSahil;
