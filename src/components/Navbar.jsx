
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-box"></div>
        <span>STOCKR</span>
      </div>

    
      <div className="search-bar">
        <input type="text" placeholder="search items, SKUs, categories..." />
      </div>

    
      <div className="nav-right">
        <button className="warehouse-btn">warehouse A</button>
        {/* <button className="register-btn">REGISTER</button>
        <button className="login-btn">LOGIN</button> */}
        <button className="profile-btn"><a href="">login /</a>

        <a href=""> register</a></button>
      </div>
    </div>
  );
};

export default Navbar;