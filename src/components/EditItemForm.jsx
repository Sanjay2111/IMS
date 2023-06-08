import React from "react";

function EditItemForm(props) {
  const { editItemData, handleEditItemChange, saveEditItem, cancelEditItem } =
    props;

  return (
    <>
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
          <label htmlFor="type">Type:</label>
          <select
            name="type"
            value={editItemData.type}
            onChange={handleEditItemChange}
          >
            <option value="">Select Type</option>
            <option value="Bag">Bag</option>
            <option value="Shoes">Shoes</option>
            <option value="Clothes">Clothes</option>
          </select>
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
    </>
  );
}

export default EditItemForm;
