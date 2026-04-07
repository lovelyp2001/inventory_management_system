import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/Addproduct";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>

      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>

          {showForm ? (
            <AddProduct setShowForm={setShowForm} />
          ) : (
            <Dashboard setShowForm={setShowForm} />
          )}

        </div>
      </div>

    </div>
  );
}

export default App;