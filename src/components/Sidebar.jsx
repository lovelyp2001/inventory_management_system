
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">

      {/* Section */}
      <div className="menu">

        <p className="menu-title">OVERVIEW</p>

        <div className="menu-item active">
          ● Dashboard
        </div>

        <div className="menu-item">
          ● Inventory 
        </div>

        <div className="menu-item">● Categories</div>

        <p className="menu-title">OPERATIONS</p>

        <div className="menu-item">
          ● Purchase Orders 
        </div>

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