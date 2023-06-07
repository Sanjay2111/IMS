import { useState, useEffect } from "react";
import axios from "axios";

function ItemTable() {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
    id: "",
    name: "",
    price: "",
    type: "",
    quantity: "",
  });
  const [dispatchItemId, setDispatchItemId] = useState(null);
  const [dispatchQuantity, setDispatchQuantity] = useState("");
  const [sortColumn, setSortColumn] = useState({
    column: null,
    order: "normal",
  });
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    price: "",
    type: "",
    quantity: "",
  });
  const [dispatchedItems, setDispatchedItems] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchDispatchedItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDispatchedItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/dispatchedItems");
      setDispatchedItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8080/items/${itemId}`);
      fetchItems(); // Refresh the item list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditItem = (itemId) => {
    const itemToEdit = items.find((item) => item.id === itemId);
    setEditItemId(itemId);
    setEditItemData(itemToEdit);
  };

  const handleEditItemChange = (e) => {
    const { name, value } = e.target;
    setEditItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveEditItem = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/items/${editItemId}`,
        editItemData
      );
      console.log("Item updated:", response.data);
      setEditItemId(null);
      setEditItemData({
        id: "",
        name: "",
        price: "",
        type: "",
        quantity: "",
      });
      fetchItems(); // Refresh the item list after update
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEditItem = () => {
    setEditItemId(null);
    setEditItemData({
      id: "",
      name: "",
      price: "",
      type: "",
      quantity: "",
    });
  };

  const handleSortColumn = (columnName) => {
    if (sortColumn.column === columnName) {
      setSortColumn((prevSortColumn) => ({
        column: prevSortColumn.column,
        order:
          prevSortColumn.order === "ascending"
            ? "descending"
            : prevSortColumn.order === "descending"
            ? "normal"
            : "ascending",
      }));
    } else {
      setSortColumn({
        column: columnName,
        order: "ascending",
      });
    }
  };

  const getSortIndicator = (columnName) => {
    if (sortColumn.column === columnName) {
      if (sortColumn.order === "ascending") {
        return "↑";
      } else if (sortColumn.order === "descending") {
        return "↓";
      }
    }
    return null;
  };

  const handleDispatchItem = (itemId) => {
    setDispatchItemId(itemId);
    setDispatchQuantity("");
  };

  const handleDispatchQuantityChange = (e) => {
    setDispatchQuantity(e.target.value);
  };

  const dispatchItem = async () => {
    try {
      await axios.post(
        `http://localhost:8080/items/${dispatchItemId}/dispatch`,
        { quantity: dispatchQuantity }
      );
      setDispatchItemId(null);
      setDispatchQuantity("");
      fetchItems(); // Refresh the item list after dispatch
      fetchDispatchedItems(); // Refresh the dispatched item list
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:8080/items", newItem);
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
    <div>
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

      <h3>Item Table</h3>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortColumn("id")}>
              ID {getSortIndicator("id")}
            </th>
            <th onClick={() => handleSortColumn("name")}>
              Name {getSortIndicator("name")}
            </th>
            <th onClick={() => handleSortColumn("price")}>
              Price {getSortIndicator("price")}
            </th>
            <th onClick={() => handleSortColumn("type")}>
              Type {getSortIndicator("type")}
            </th>
            <th onClick={() => handleSortColumn("quantity")}>
              Quantity {getSortIndicator("quantity")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {editItemId === item.id ? (
                <>
                  <td>{item.id}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editItemData.name}
                      onChange={handleEditItemChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="price"
                      value={editItemData.price}
                      onChange={handleEditItemChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="type"
                      value={editItemData.type}
                      onChange={handleEditItemChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="quantity"
                      value={editItemData.quantity}
                      onChange={handleEditItemChange}
                    />
                  </td>
                  <td>
                    <button type="button" onClick={saveEditItem}>
                      Save
                    </button>
                    <button type="button" onClick={cancelEditItem}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.type}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleEditItem(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDispatchItem(item.id)}
                    >
                      Dispatch
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {dispatchItemId && (
        <div>
          <h4>Dispatch Item</h4>
          <p>Quantity:</p>
          <input
            type="text"
            value={dispatchQuantity}
            onChange={handleDispatchQuantityChange}
          />
          <button type="button" onClick={dispatchItem}>
            Dispatch
          </button>
        </div>
      )}
    </div>
  );
}

export default ItemTable;
