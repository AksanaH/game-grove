import React, { useState, useEffect } from "react";
import { Col, Row, Dropdown, Menu, Button } from "antd";
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

  const menu = (
    <Menu style={{ backgroundColor: "black" }}>
      <Menu.Item key="1">
        <Link className="navlink" to="/">
          Games
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link className="navlink" to="/searchgames">
          Search
        </Link>
      </Menu.Item>
      {isLoggedIn && (
        <>
          <Menu.Item key="3">
            <Link className="navlink" to="/mygames">
              My Games
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link className="navlink" to="/profile">
              Profile
            </Link>
          </Menu.Item>
        </>
      )}
      {isLoggedIn ? (
        <Menu.Item key="5" onClick={handleLogout}>
          <span className="navlink" style={{ cursor: "pointer" }}>
            Logout
          </span>
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="6">
            <Link className="navlink" to="/login">
              Login
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link className="navlink" to="/signup">
              Signup
            </Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Row justify="space-between" className="header" align="middle">
      <Col>
        <Link to="/">
          <img
            src="./images/gamecue-transparent.png"
            alt=""
            style={{ width: "75px", height: "75px", margin: "5px" }}
          />
        </Link>
      </Col>
      <Col className="navlinks">
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
          <>
            <Link className="navlink" to="/login">
              Login
            </Link>
            <Link className="navlink" to="/signup">
              Signup
            </Link>
          </>
        )}
      </Col>
      <Col className="menu-icon">
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            type="text"
            icon={<MenuOutlined style={{ color: "white" }} />}
          />
        </Dropdown>
      </Col>
    </Row>
  );
};

export default Navbar;
