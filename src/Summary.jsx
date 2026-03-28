function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <div className="summary-card">
        <div className="card-label">
          <span className="card-icon income">&#8593;</span>
          Income
        </div>
        <p className="income-amount">${totalIncome.toLocaleString()}</p>
      </div>
      <div className="summary-card">
        <div className="card-label">
          <span className="card-icon expense">&#8595;</span>
          Expenses
        </div>
        <p className="expense-amount">${totalExpenses.toLocaleString()}</p>
      </div>
      <div className="summary-card">
        <div className="card-label">
          <span className="card-icon balance">&#9878;</span>
          Balance
        </div>
        <p className="balance-amount">${balance.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Summary;
