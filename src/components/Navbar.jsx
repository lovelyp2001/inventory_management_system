import "./Navbar.css";
import { useEffect, useState } from "react";

const Navbar = () => {

  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="navbar">
      
      <div className="logo">
        <div className="logo-box"></div>
        <span>STOCKR</span>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="search items, SKUs, categories..." />
      </div>

      <div className="nav-right">
       
        {user ? (
          <div className="profile-container">
            
            <button 
              className="profile-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              {user.name || user.fullname}
            </button>

           
            {showMenu && (
              <div className="dropdown">
                <p onClick={() => alert("Edit Profile")}>
                  Edit Profile
                </p>

                <p onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}

          </div>
        ) : (
          <button className="profile-btn">
            login / register
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;