import { useState } from "react";
import "./Addproduct.css";

const AddProduct = ({ setShowForm }) => {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: ""
  });

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // yaha API lagegi baad me

    alert("Product Added ✅");

    // reset form
    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      supplier: ""
    });
  };

  // clear
  const handleClear = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      supplier: ""
    });
  };

  return (
    <div className="add-product">

      <h2>Add Product</h2>

      <form className="form" onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          type="text"
          name="supplier"
          placeholder="Supplier"
          value={formData.supplier}
          onChange={handleChange}
        />

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleClear}>Clear</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
};

export default AddProduct;