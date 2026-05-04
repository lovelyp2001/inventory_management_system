
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">

        <div className="menu-item">
          <Link to="/">● Dashboard</Link>
        </div>

        <div className="menu-item">
          <Link to="/products">● Products</Link>
        </div>

        <div className="menu-item">
          <Link to="/categories">● Categories</Link>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;