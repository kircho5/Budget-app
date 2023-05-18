function Transaction({ filteredTransactions, handleDeleteTransaction }) {
  return (
    <ul className="transactions">
      {filteredTransactions.map((transaction, index) => (
        <li key={index}>
          ({transaction.type}) {transaction.reason} - $
          {transaction.amount.toFixed(2)} - {transaction.date}
          <button onClick={() => handleDeleteTransaction(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default Transaction;
