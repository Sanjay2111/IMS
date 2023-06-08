function DispatchForm(props) {
  const { quantity, onQuantityChange, onDispatch } = props;

  return (
    <div className="dispatch-form">
      <h3>Dispatch Item</h3>
      <form>
        <div>
          <label>Quantity:</label>
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={onQuantityChange}
          />
        </div>
        <div>
          <button type="button" onClick={onDispatch}>
            Dispatch
          </button>
        </div>
      </form>
    </div>
  );
}

export default DispatchForm;
