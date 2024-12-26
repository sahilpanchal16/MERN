import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const clothingItems = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 19.99,
    src: require("../../images/women1.1.jpeg"),
    hoverSrc: require("../../images/women1.jpeg"),
  },
  {
    id: 2,
    name: "Blue Denim Jeans",
    price: 49.99,
    src: require("../../images/women2.1.jpeg"),
    hoverSrc: require("../../images/women2.jpeg"),
  },
  {
    id: 3,
    name: "Black Leather Jacket",
    price: 99.99,
    src: require("../../images/women3.jpeg"),
    hoverSrc: require("../../images/women3.1.jpeg"),
  },
  {
    id: 4,
    name: "Brown Suede Shoes",
    price: 79.99,
    src: require("../../images/women4.jpeg"),
    hoverSrc: require("../../images/women4.1.jpeg"),
  },
   {
    id: 5,
    name: "Navy Blue Blazer",
    price: 129.99,
    src: require("../../images/women5.jpeg"),
    hoverSrc: require("../../images/women5.1.jpeg"), // Add hover image
  },
  {
    id: 6,
    name: "Gray Wool Sweater",
    price: 59.99,
    src: require("../../images/women6.jpeg"),
    hoverSrc: require("../../images/women6.1.jpeg"), // Add hover image
  },
];

const WoMen = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (item) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...item, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Redirect to the Cart page
    navigate("/cart");
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Women's Clothing Collection</h1>
      <Row>
        {clothingItems.map((item) => (
          <Col key={item.id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={item.src}
                alt={item.name}
                onMouseEnter={(e) => (e.currentTarget.src = item.hoverSrc)}
                onMouseLeave={(e) => (e.currentTarget.src = item.src)}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>${item.price.toFixed(2)}</Card.Text>
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

export default WoMen;
