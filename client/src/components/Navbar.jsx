import { Col, Divider, Row } from "antd";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <Row justify="end" className="header" align="middle">
      <Col span={2}>
        <Link className="navlink" to="/">
          Games
        </Link>
      </Col>
      <Col span={2}>
        <Link className="navlink" to="/search">
          Search
        </Link>
      </Col>
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
      <Col span={2}>
        <Link className="navlink" to="/login">
          Login
        </Link>
      </Col>
    </Row>
  );
};
export default Navbar;
