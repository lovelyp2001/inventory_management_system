import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import rice from "../assets/rice.png";
import peanuts from "../assets/peanuts.jpeg";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://192.168.29.80:7000/getProduct");
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(); // first load

    const interval = setInterval(() => {
      fetchData(); // every 2 sec auto update
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getImage = (name) => {
    const product = name.toLowerCase();

    if (product.includes("rice"))
      return "../assets/rice.png";

    if (product.includes("peanuts"))
      return "../assets/peanuts.jpeg";

    if (product.includes("sugar"))
      return "https://cdn-icons-png.flaticon.com/512/1046/1046784.png";

    if (product.includes("salt"))
      return "https://cdn-icons-png.flaticon.com/512/2553/2553691.png";

    return "https://cdn-icons-png.flaticon.com/512/3081/3081559.png";
  };

  return (
    <div className="dashboard-container">
      <h2>Stock Dashboard</h2>

      <div className="card-box">
        {products.map((item) => (
          <div className="stock-card" key={item.id}>
            <img src={getImage(item.name)} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.category}</p>
            <p className="price">₹ {item.price}</p>
            <p>Qty: {item.quantity} {item.unit}</p>

            <span className={item.quantity > 0 ? "stock in" : "stock out"}>
              {item.quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;