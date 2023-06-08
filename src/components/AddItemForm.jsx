import React, { useState } from "react";
import axios from "axios";

function AddItemForm({ fetchItems }) {
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    price: "",
    type: "",
    quantity: "",
  });

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:8080/item", newItem);
      fetchItems(); // Refresh the item list after adding a new item
      setNewItem({
        id: "",
        name: "",
        price: "",
        type: "",
        quantity: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Add Item</h3>
      <form>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={newItem.id}
            onChange={handleNewItemChange}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleNewItemChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newItem.price}
            onChange={handleNewItemChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={newItem.type}
            onChange={handleNewItemChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={newItem.quantity}
            onChange={handleNewItemChange}
          />
        </div>
      </form>
      <button type="button" onClick={handleAddItem}>
        Add
      </button>
    </>
  );
}

export default AddItemForm;
