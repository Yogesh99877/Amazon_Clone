import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const pageInfo = {

  "/": {
    title: "Dashboard",
    description: "Overview of your business"
  },

  "/users": {
    title: "Users",
    description: "Manage your customers and team"
  },

  "/products": {
    title: "Products",
    description: "Manage your product catalog"
  },

  "/orders": {
    title: "Orders",
    description: "Track and manage orders"
  },

  "/analytics": {
    title: "Analytics",
    description: "Understand your business performance"
  },

  "/settings": {
    title: "Settings",
    description: "Manage application preferences"
  }

};

export default function Navbar({ onMenu }) {

  const location = useLocation();

  const { theme, toggleTheme } =
    useTheme();

  const current =
    pageInfo[location.pathname] ||
    pageInfo["/"];

  return (

    <header className="navbar">

      <button
        className="mobile-menu"
        onClick={onMenu}
      >
        ☰
      </button>

      <div className="page-title">

        <h1>
          {current.title}
        </h1>

        <p>
          {current.description}
        </p>

      </div>

      <div className="navbar-actions">

        <div className="search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <button
          className="icon-btn"
          onClick={toggleTheme}
        >
          {theme === "light"
            ? "☾"
            : "☀"}
        </button>

        <button className="icon-btn">
          ♢
        </button>

        <div className="top-avatar">
          AM
        </div>

      </div>

    </header>
  );
}