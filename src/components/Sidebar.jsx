import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">

        <p className="menu-title">OVERVIEW</p>

        <div className="menu-item">
          <Link to="/">● Dashboard</Link>
        </div>

        <div className="menu-item">
  <Link to="/inventory">● Inventory</Link>
</div>

        <div className="menu-item">
          <Link to="/categories">● Categories</Link>
        </div>

        <p className="menu-title">OPERATIONS</p>

        <div className="menu-item">● Purchase Orders</div>
        <div className="menu-item">● Transfers</div>
        <div className="menu-item">● Adjustments</div>

        <p className="menu-title">REPORTS</p>

        <div className="menu-item">● Analytics</div>
        <div className="menu-item">● Audit Log</div>

      </div>
    </div>
  );
};

export default Sidebar;