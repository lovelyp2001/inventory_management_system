import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Categories from "../components/Categories";
import Dashboard from "../components/Dashboard";

function AppRoute() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Router>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default AppRoute;