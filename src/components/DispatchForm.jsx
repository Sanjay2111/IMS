function DispatchForm({ quantity, onQuantityChange, onDispatch }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission and page reload
    onDispatch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={quantity}
          onChange={onQuantityChange}
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Dispatch
      </button>
    </form>
  );
}

export default DispatchForm;
