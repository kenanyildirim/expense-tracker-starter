import { useMemo } from 'react';

function Summary({ transactions }) {
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  return (
    <div className="summary" role="region" aria-label="Financial summary">
      <div className="summary-card">
        <div className="card-label">
          <span className="card-icon income" aria-hidden="true">&#8593;</span>
          Income
        </div>
        <p className="income-amount">${totalIncome.toLocaleString()}</p>
      </div>
      <div className="summary-card">
        <div className="card-label">
          <span className="card-icon expense" aria-hidden="true">&#8595;</span>
          Expenses
        </div>
        <p className="expense-amount">${totalExpenses.toLocaleString()}</p>
      </div>
      <div className="summary-card">
        <div className="card-label">
          <span className="card-icon balance" aria-hidden="true">&#9878;</span>
          Balance
        </div>
        <p className={`balance-amount${balance < 0 ? ' negative' : ''}`}>${balance.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Summary;
