function SelectTransaction({ show, handleShowChange }) {
  return (
    <div className="select-transaction">
      <label>
        Show:
        <select value={show} onChange={handleShowChange}>
          <option value="">All Transactions</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </select>
      </label>
    </div>
  );
}
export default SelectTransaction;
