import React, { useState } from "react";
import {
  Container,
  Table,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const Cart = () => {
  // Fetch the cart data from localStorage
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Calculate the total price
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update quantity in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Prevent negative quantities
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Place the order
  const placeOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setCart([]); // Clear the cart
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty!</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.poster} // Correctly use the poster URL stored in the cart
                      alt={item.name || "Product Image"}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <InputGroup>
                      <FormControl
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value, 10))
                        }
                      />
                    </InputGroup>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <Button variant="success" onClick={placeOrder}>
              Place Order
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
