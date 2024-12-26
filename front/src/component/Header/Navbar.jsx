import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Navbar.css";

function CustomNavbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/login");
  };

  const handleMenClick = () => {
    navigate("/Men");
  };

  const handleWomenClick = () => {
    navigate("/Women");
  };

  const handleCartClick = () => {
    navigate("/Cart");
  };

  return (
    <>
      <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
        <div className="d-flex align-items-center">
          <i className="bi bi-facebook me-3 fs-5"></i>
          <i className="bi bi-instagram me-3 fs-5"></i>
          <i className="bi bi-pinterest me-3 fs-5"></i>
        </div>
        <div className="text-center flex-grow-1">SP</div>
        <div className="d-flex align-items-center">
          <i className="bi bi-search me-3 fs-5"></i>
          <i
            className="bi bi-person me-3 fs-4"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className="bi bi-cart me-3 fs-5"
            onClick={handleCartClick}
            style={{ cursor: "pointer" }}
          ></i>
        </div>
      </header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="#new-arrivals">New Arrivals</Nav.Link>
              <Nav.Link onClick={handleMenClick}>Men</Nav.Link>{" "}
              {/* Updated link */}
              <Nav.Link onClick={handleWomenClick} href="#women">
                Women
              </Nav.Link>
              <Nav.Link href="#accessories">Accessories</Nav.Link>
              <Nav.Link href="#store-location">Store Location</Nav.Link>
              <Nav.Link href="#contact-us">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
