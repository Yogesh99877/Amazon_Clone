import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app">

      <Sidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <div className="main">

        <Navbar
          onMenu={() => setMobileOpen(true)}
        />

        <main className="content">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/users" element={<Users />} />

            <Route path="/products" element={<Products />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/analytics" element={<Analytics />} />

            <Route path="/settings" element={<Settings />} />

          </Routes>

        </main>

      </div>

    </div>
  );
}