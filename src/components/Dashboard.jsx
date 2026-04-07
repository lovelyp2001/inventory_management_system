import "./Dashboard.css";

const Dashboard = ({ setShowForm }) => {
  return (
    <div className="dashboard">

   
      <div className="dashboard-header">
        <h2>Inventory Dashboard</h2>

       
        <button 
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Item
        </button>
      </div>

    </div>
  );
};

export default Dashboard;