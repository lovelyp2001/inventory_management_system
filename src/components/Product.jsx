import { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [unit, setUnit] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [page, setPage] = useState(1);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    quantity: "",
    unit_id: "",
    price: "",
    product_code: ""
  });

  // useEffect(() => {
  //   fetchProduct();
  //   fetchCategories();
  //   fetchUnit();
  // }, []);

  useEffect(() => {
  fetchProduct(page);
  fetchCategories();
  fetchUnit();
}, [page]);
 

  const fetchProduct = async (currentPage = 1) => {
  try {
    const res = await axios.get(`http://localhost:7000/product/getProduct/${currentPage}` );

    setProduct(res.data.data || []);
  } 
  catch (err) 
  {
    console.log(err);
  }
};

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:7000/category/getCategory");
      setCategories(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUnit = async () => {
    try {
      const res = await axios.get("http://localhost:7000/unit/Unit");
      setUnit(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };


  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:7000/product/product_add", formData);

      alert("Product Added Successfully");
      fetchProduct();
      resetForm();
    } catch (err) {
      console.log(err);
      alert("Product already exists");
    }
  };


  const handleEdit = (item) => {
    setEditId(item.id);

    setFormData({
      name: item.name,
      category_id: item.category_id,
      quantity: item.quantity,
      unit_id: item.unit_id,
      price: item.price,
      product_code: item.product_code
    });

    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category_id: "",
      quantity: "",
      unit_id: "",
      price: "",
      product_code: ""
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        `http://localhost:7000/product/updateProduct/${editId}`,
        formData
      );

      alert("Product Updated Successfully");
      fetchProduct();
      resetForm();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm( "Are you sure you want to delete this product?" );

    if (!confirmDelete) return;

    try {
      await axios.post(`http://localhost:7000/product/deleteProduct/${id}`);

      alert("Product deleted successfully!");
      fetchProduct();

    }
    catch (err) {
      console.log(err);
      alert("Delete failed!");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/product/search?search=${search}`);

      setProduct(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }; 

  const handleSearchCategory = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/category/searchCategory?search=${searchCategory}`);
        
       setProduct(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-page">
      <h2>Products</h2>

      <div className="top-bar">

        <div className="search-box">
          <input type="text" placeholder="Search Product" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="inside-search-btn" onClick={handleSearch} > Search </button>
        </div>
         
         <div className="search-box">
        <input type="text" placeholder=" Search Category" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
        <button className="inside-search-btn" onClick={ handleSearchCategory} > Search </button>
         </div>

        <button onClick={() => setShowForm(true)}> Add Product </button>
       

      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category_id</th>
            <th>Quantity</th>
            <th>Unit_id</th>
            <th>Price</th>
            <th>Product_Code</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {product.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category_id}</td>
              <td>{item.quantity}</td>
              <td>{item.unit_id}</td>
              <td>₹{item.price}</td>
              <td>{item.product_code}</td>

              <td>
                <div className="action-btns">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">

  <button
    disabled={page === 1} onClick={() => setPage(page - 1)}>Prev
  </button>

  <span>Page {page}</span>

  <button
    disabled={product.length < 5} onClick={() => setPage(page + 1)} > Next
  </button>

</div>

      {showForm && (
        <div className="modal">
          <div className="modal-box">
            <h3>{editId ? "Update Product" : "Add Product"}</h3>

            <input placeholder="Product Name" value={formData.name}  onChange={(e) =>
                setFormData({ ...formData, name: e.target.value }) } />

            <select value={formData.category_id} onChange={(e) =>
               setFormData({  ...formData, category_id: e.target.value }) } >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category_name}
                </option>
              ))}
            </select>

            <input
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: e.target.value
                })
              }
            />

            <select
              value={formData.unit_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  unit_id: e.target.value
                })
              }
            >
              <option value="">Select Unit</option>

              {unit.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.unit}
                </option>
              ))}
            </select>

            <input
              placeholder="Price"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value
                })
              }
            />

            <input
              placeholder="Product Code"
              value={formData.product_code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  product_code: e.target.value
                })
              }
            />

            {editId ? (
              <button onClick={handleUpdate}>Update</button>
            ) : (
              <button onClick={handleAdd}>Save</button>
            )}

            <button className="close-btn" onClick={resetForm}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;