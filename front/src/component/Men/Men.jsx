import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const Men = () => {
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const accountType = localStorage.getItem("accountType");

    if (accountType === "seller") {
      navigate("/production");
      return;
    }
    if (accountType !== "buyer") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1604/man/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClothingItems(response.data.data || []);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((cartItem) => cartItem.id === item._id);
    if (existingItem) {
      cart = cart.map((cartItem) =>
        cartItem.id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      cart.push({
        id: item._id,
        name: item.man_name,
        price: item.price,
        quantity: 1,
        poster: item.poster
          ? `http://localhost:1604/man/img/${item.poster}`
          : "https://via.placeholder.com/300",
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Men's Clothing Collection</h1>
      <Row>
        {clothingItems.map((item) => (
          <Col key={item._id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  item.poster
                    ? `http://localhost:1604/man/img/${item.poster}`
                    : "https://via.placeholder.com/300"
                }
                alt={item.man_name || "Clothing Item"}
              />
              <Card.Body>
                <Card.Title>{item.man_name || "No Name Available"}</Card.Title>
                <Card.Text>${item.price?.toFixed(2) || "0"}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Men;
