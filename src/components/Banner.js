import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "../styles/Banner.css";

const Banner = ({ user }) => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("Successfully signed out.");
      })
      .catch(() => {
        alert("Couldn't log out. Try again.");
      });
  };

  return (
    <Navbar className="justify-content-between" bg="primary" variant="dark">
      <Navbar.Collapse>
        <Navbar.Brand>LostNFound</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav id="page-nav" className="mr-auto">
          <Navbar.Text className="nav-text">
            <Link to="/">Home</Link>
          </Navbar.Text>
          <Navbar.Text className="nav-text">
            <Link to="/inbox">Inbox</Link>
          </Navbar.Text>
          <Navbar.Text className="nav-text">
            <Link to="/file-item">File an Item</Link>
          </Navbar.Text>
          {!user ? (
            <Link to="/login" className="auth-control">
              <Button variant="outline-light">Login</Button>
            </Link>
          ) : (
            <span className="auth-control">
              <Navbar.Text className="nav-text">{user.displayName}</Navbar.Text>
              <Button onClick={handleLogout} variant="outline-light">
                Logout
              </Button>
            </span>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Banner;
