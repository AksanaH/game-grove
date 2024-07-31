
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./components/Signup.jsx";
import SavedGames from "./pages/SavedGames.jsx";
import Profile from "./pages/Profile.jsx";
import SearchGames from "./pages/SearchGames.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/mygames",
        element: <SavedGames />,
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: "/searchgames", 
        element: <SearchGames />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
