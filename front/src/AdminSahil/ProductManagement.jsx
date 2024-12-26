import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  // State variables
  const [mans, setMans] = useState([]);
  const [loading, setLoading] = useState(false); // Improved: No unnecessary default loading spinner
  const [error, setError] = useState(null);

  const [manName, setManName] = useState("");
  const [price, setPrice] = useState("");
  const [poster, setPoster] = useState(null);
  const [category, setCategory] = useState("Men");
  const [editMode, setEditMode] = useState(false);
  const [currentManId, setCurrentManId] = useState(null);

  // Retrieve token and userId from localStorage
  const token = localStorage.getItem("token");
  // const userId = localStorage.getItem("userId");

  // Redirect to login if no token or userId
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch products
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:1604/man/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMans(response.data.data || []);
      setError(null); // Clear errors on successful fetch
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component load
  useEffect(() => {
    fetchData();
  }, []);

  // Handle create or update operation
  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    if (!manName || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("man_name", manName);
    formData.append("price", price);
    formData.append("category", category);
    if (poster) formData.append("poster", poster);

    try {
      setLoading(true);

      if (editMode) {
        await axios.put(
          `http://localhost:1604/man/update/${currentManId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Product updated successfully.");
      } else {
        // Create new product
        await axios.post("http://localhost:1604/man/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product created successfully.");
      }

      resetForm();
      fetchData(); // Refresh the data after saving
    } catch (err) {
      console.error("Error saving product:", err);
      alert(err.response?.data?.message || "Failed to save the product.");
    } finally {
      setLoading(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setManName("");
    setPrice("");
    setPoster(null);
    setCategory("Men");
    setEditMode(false);
  };

  // Handle delete operation
  const deleteMan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setLoading(true);
      await axios.delete(`http://localhost:1604/man/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted successfully.");
      fetchData(); // Refresh data after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete the product.");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit action
  const handleEdit = (man) => {
    setManName(man.man_name);
    setPrice(man.price);
    setCategory(man.category);
    setCurrentManId(man._id);
    setEditMode(true);
  };

  return (
    <div>
      <h1>Products</h1>

      {/* Form for Create/Update */}
      <form onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          placeholder="Name"
          value={manName}
          onChange={(e) => setManName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setPoster(e.target.files[0])} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
        <button type="submit" disabled={loading}>
          {editMode ? "Update" : "Create"} Product
        </button>
        {editMode && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Display Loading, Error, or Products */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <ul>
            {mans.map((man) => (
              <li key={man._id}>
                <h3>{man.man_name}</h3>
                <p>${man.price}</p>
                {man.poster && (
                  <img
                    src={`http://localhost:1604/man/img/${man.poster}`}
                    alt={man.man_name}
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
                <button onClick={() => handleEdit(man)}>Edit</button>
                <button onClick={() => deleteMan(man._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Products;
