function Form({ handleAddTransaction }) {
  return (
    <form onSubmit={handleAddTransaction} className="form">
      <label for="reason">Reason:</label>
      <input type="text" name="reason" required />
      <label for="amount">Amount:</label>
      <input type="number" name="amount" required />
      <label for="type">Type:</label>
      <select name="type" required>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default Form;
