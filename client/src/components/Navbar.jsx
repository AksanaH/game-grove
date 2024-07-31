import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Auth from "../utils/auth"; // Import the Auth utility

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in using Auth utility
    setIsLoggedIn(Auth.loggedIn());
  }, []);

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false); // Update the state to reflect the logout
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <Row justify="end" className="header" align="middle">
      <Col span={2}>
        <Link className="navlink" to="/">
          Games
        </Link>
      </Col>
      <Col span={2}>
        <Link className="navlink" to="/searchgames">
          Search
        </Link>
      </Col>
      {isLoggedIn && (
        <>
          <Col span={2}>
            <Link className="navlink" to="/mygames">
              My Games
            </Link>
          </Col>
          <Col span={2}>
            <Link className="navlink" to="/profile">
              Profile
            </Link>
          </Col>
        </>
      )}
      <Col span={2}>
        {isLoggedIn ? (
          <span
            className="navlink"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        ) : (
          <Link className="navlink" to="/login">
            Login
          </Link>
        )}
      </Col>
      {!isLoggedIn && (
        <Col span={2}>
          <Link className="navlink" to="/signup">
            Signup
          </Link>
        </Col>
      )}
    </Row>
  );
};

export default Navbar;
