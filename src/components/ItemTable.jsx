import { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./ItemList";
import AddItemForm from "./AddItemForm";

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

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/items");
      setItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dispatchItem = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/items/${dispatchItemId}/dispatch`,
        { dispatchQuantity }
      );
      console.log("Item dispatched:", response.data);
      setDispatchItemId(null);
      setDispatchQuantity("");
      fetchItems(); // Refresh the item list after dispatch
    } catch (error) {
      console.log("Dispatch error:", error);
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
      console.log("Response headers:", error.response.headers);
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

  const sortedItems = items.sort((a, b) => {
    if (sortColumn.column === "price") {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      if (sortColumn.order === "ascending") {
        return priceA - priceB;
      } else if (sortColumn.order === "descending") {
        return priceB - priceA;
      }
    } else if (sortColumn.column === "quantity") {
      const quantityA = parseInt(a.quantity);
      const quantityB = parseInt(b.quantity);
      if (sortColumn.order === "ascending") {
        return quantityA - quantityB;
      } else if (sortColumn.order === "descending") {
        return quantityB - quantityA;
      }
    }
    return 0;
  });

  return (
    <>
      <AddItemForm fetchItems={fetchItems} />
      <div>
        <ItemList
          items={sortedItems}
          editItemId={editItemId}
          editItemData={editItemData}
          dispatchItemId={dispatchItemId}
          dispatchQuantity={dispatchQuantity}
          sortColumn={sortColumn}
          getSortIndicator={getSortIndicator}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
          handleEditItemChange={handleEditItemChange}
          saveEditItem={saveEditItem}
          cancelEditItem={cancelEditItem}
          handleSortColumn={handleSortColumn}
          handleDispatchItem={handleDispatchItem}
          handleDispatchQuantityChange={handleDispatchQuantityChange}
          dispatchItem={dispatchItem}
        />
      </div>
    </>
  );
}

export default ItemTable;
