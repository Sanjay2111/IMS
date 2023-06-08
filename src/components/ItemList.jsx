import React from "react";
import DispatchForm from "./DispatchForm";

function ItemList(props) {
  const {
    items,
    editItemId,
    editItemData,
    dispatchItemId,
    dispatchQuantity,
    sortColumn,
    getSortIndicator,
    handleDeleteItem,
    handleEditItem,
    handleEditItemChange,
    saveEditItem,
    cancelEditItem,
    handleSortColumn,
    handleDispatchItem,
    handleDispatchQuantityChange,
    dispatchItem,
  } = props;

  return (
    <>
      <table className="table table-striped item-table">
        <thead>
          <tr>
            <th className="bg-dark text-light">ID</th>
            <th className="bg-dark text-light">Name</th>
            <th className="bg-dark text-light">Type</th>
            <th
              onClick={() => handleSortColumn("price")}
              className={`${
                sortColumn.column === "price" ? sortColumn.order : ""
              } bg-dark text-light`}
            >
              Price {getSortIndicator("price")}
            </th>
            <th
              onClick={() => handleSortColumn("quantity")}
              className={`${
                sortColumn.column === "quantity" ? sortColumn.order : ""
              } bg-dark text-light`}
            >
              Quantity {getSortIndicator("quantity")}
            </th>
            <th className="bg-dark text-light">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
                {editItemId !== item.id && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleEditItem(item.id)}
                  >
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleDispatchItem(item.id)}
                >
                  Dispatch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editItemId && (
        <div className="edit-item-form">
          <h3>Edit Item</h3>
          <form>
            <div>
              <label>ID:</label>
              <input
                type="text"
                name="id"
                value={editItemData.id}
                onChange={handleEditItemChange}
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editItemData.name}
                onChange={handleEditItemChange}
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={editItemData.price}
                onChange={handleEditItemChange}
              />
            </div>
            <div>
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={editItemData.type}
                onChange={handleEditItemChange}
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={editItemData.quantity}
                onChange={handleEditItemChange}
              />
            </div>
            <div>
              <button type="button" onClick={saveEditItem}>
                Save
              </button>
              <button type="button" onClick={cancelEditItem}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {dispatchItemId && (
        <DispatchForm
          quantity={dispatchQuantity}
          onQuantityChange={handleDispatchQuantityChange}
          onDispatch={dispatchItem}
        />
      )}

      <table className="table additional-table">
        <thead>
          <tr className="bg-dark">
            <th className="bg-dark text-light">ID</th>
            <th className="bg-dark text-light">Name</th>
            <th className="bg-dark text-light">Order Number</th>
            <th className="bg-dark text-light">Dispatch Quantity</th>
            <th className="bg-dark text-light">Sale Generated</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.orderNumber}</td>
              <td>{item.dispatchQuantity}</td>
              <td>{item.saleGenerated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ItemList;
