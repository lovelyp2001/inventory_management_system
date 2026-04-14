import { useEffect, useState } from "react";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "",
    price: "",
    product_code: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://192.168.29.80:7000/getProduct");
      setProducts(res.data.data);   // FIX
    } catch (err) {
      console.log(err);
      alert("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://192.168.29.80:7000/addProduct",
        formData
      );

      alert(res.data.message);

      fetchProducts(); // auto refresh table

      setFormData({
        name: "",
        category: "",
        quantity: "",
        unit: "",
        price: "",
        product_code: ""
      });

    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.29.80:7000/deleteProduct`);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="categories-container">
      <h2>Categories / Products</h2>

      <div className="form-box">
        <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
        <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input name="product_code" placeholder="Product Code" value={formData.product_code} onChange={handleChange} />

        <button onClick={handleAdd}>Add Product</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Code</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>₹{item.price}</td>
                <td>{item.product_code}</td>

                <td>
                  <button onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;