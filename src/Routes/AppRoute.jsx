import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Product from "../components/Product";
import Category from "../components/Category";
import Dashboard from "../components/Dashboard";

function AppRoute() {
  return (
    <Router>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Product />} />
            <Route path="/categories" element={<Category />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AppRoute;