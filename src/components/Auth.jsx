import { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Auth = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Email and Password required");
      return;
    }

    try {
      if (isLogin) {
   
        const res = await axios.post(
          "http://192.168.29.80:7000/login",
          {
            email: formData.email,
            password: formData.password
          }
        );

        if (!res.data || !res.data.user) {
          alert("User not registered");
          return;
        }

        localStorage.setItem("login", "true");
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setIsLoggedIn(true);
        alert("Login Success");

      } else {
        
        if (!formData.name || !formData.phone) {
          alert("All fields required");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          alert("Password not match");
          return;
        }

    
        const res = await axios.post(
          "http://192.168.29.80:7000/register",
          formData
        );

        alert(res.data.message);
        setIsLogin(true);
      }

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="auth-container">
      <h1>STOCKR</h1>

      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          {!isLogin && (
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Register" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;