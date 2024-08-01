import React, { useState, useEffect } from "react";
import { Col, Row, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Auth from "../utils/auth"; // Import the Auth utility

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [visible, setVisible] = useState(false);
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

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  return (
    <>
      <Row justify="end" className="header" align="middle">
        <Col
          span={24}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            paddingTop: "8px",
          }}
        >
          <img
            src="./images/gamecue-transparent.png"
            alt="game logo"
            style={{ width: "75px", height: "75px" }}
          />
        </Col>
        <Col
          span={20}
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="desktop-menu"
        >
          <Link className="navlink" to="/">
            Games
          </Link>
          <Link className="navlink" to="/searchgames">
            Search
          </Link>
          {isLoggedIn && (
            <>
              <Link className="navlink" to="/mygames">
                My Games
              </Link>
              <Link className="navlink" to="/profile">
                Profile
              </Link>
            </>
          )}
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
          {!isLoggedIn && (
            <Link className="navlink" to="/signup">
              Signup
            </Link>
          )}
        </Col>
        <Col span={20} className="mobile-menu" style={{ display: "none" }}>
          <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
        </Col>
      </Row>
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        className="mobile-menu"
      >
        <Link className="navlink" to="/" onClick={closeDrawer}>
          Games
        </Link>
        <Link className="navlink" to="/searchgames" onClick={closeDrawer}>
          Search
        </Link>
        {isLoggedIn && (
          <>
            <Link className="navlink" to="/mygames" onClick={closeDrawer}>
              My Games
            </Link>
            <Link className="navlink" to="/profile" onClick={closeDrawer}>
              Profile
            </Link>
          </>
        )}
        {isLoggedIn ? (
          <span
            className="navlink"
            onClick={() => {
              handleLogout();
              closeDrawer();
            }}
            style={{ cursor: "pointer" }}
          >
            Logout
          </span>
        ) : (
          <Link className="navlink" to="/login" onClick={closeDrawer}>
            Login
          </Link>
        )}
        {!isLoggedIn && (
          <Link className="navlink" to="/signup" onClick={closeDrawer}>
            Signup
          </Link>
        )}
      </Drawer>
    </>
  );
};

export default Navbar;
