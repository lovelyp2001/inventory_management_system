import { useEffect, useState } from "react";
import axios from "axios";
import "./Category.css";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [category_name, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await axios.get("http://localhost:7000/category/getCategory");
      setCategory(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:7000/category/addCategory", { category_name });

      alert("Category added successfully!");
      setCategoryName("");
      setShowForm(false);
      fetchCategory();

    } catch (err) {
      console.log(err);  
      alert("Category already exists.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditName(item.category_name);
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        `http://localhost:7000/category/updateCategory/${editId}`,
        { category_name: editName }
      );

      alert("Category updated successfully!");
      setEditId(null);
      setEditName("");
      fetchCategory();

    } catch (err) {
      console.log(err);
      alert("Update failed!");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await axios.post(`http://localhost:7000/category/delete_Category/${id}`);

      alert("Category deleted successfully!");
      fetchCategory();

    } catch (err) {
      console.log(err);
      alert("Delete failed!");
    }
  };

  return (
    <div className="category-page">
      <div className="top-bar">
        <h2>Categories</h2>
        <button onClick={() => setShowForm(true)}>
          Create Category
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {category.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.category_name}</td>

              <td className="action-btns">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Category</h3>

            <input
              type="text"
              placeholder="Enter Category Name"
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <button onClick={handleAdd}>Save</button>

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editId && (
        <div className="modal">
          <div className="modal-box">
            <h3>Update Category</h3>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <button onClick={handleUpdate}>Update</button>

            <button
              className="close-btn"
              onClick={() => setEditId(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;