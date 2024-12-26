// Login.js
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Custom CSS file

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Hardcoded admin credentials
  const adminCredentials = {
    email: "admin@example.com",
    password: "123",
  };

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      // Check if the entered credentials match the hardcoded admin credentials
      if (
        userInfo.email === adminCredentials.email &&
        userInfo.password === adminCredentials.password
      ) {
        // Redirect to AdminSahil page
        navigate("/admin");
      } else {
        // Attempt login for other users
        const response = await axios.post(
          "http://localhost:1604/user/login",
          userInfo
        );

        if (response.data.token) {
          // Save token in localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user._id);

          const { accountType } = response.data.user;

          if (accountType === "seller") {
            navigate("/production");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <Container className="login-container">
      <h2 className="text-center">Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email", { required: true })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100">
          Login
        </Button>
      </Form>
      <p className="mt-3 text-center">
        Not registered?{" "}
        <a href="/signup" onClick={handleSignupClick}>
          Signup
        </a>
      </p>
    </Container>
  );
}

export default Login;
