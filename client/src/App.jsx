import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default App;
