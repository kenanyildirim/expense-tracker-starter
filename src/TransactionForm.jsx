import { useState } from 'react';
import { categories } from './constants';

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    const parsed = parseFloat(amount);
    if (!amount || isNaN(parsed) || parsed <= 0) {
      setError("Enter a valid amount greater than 0");
      return;
    }

    setError("");
    onAddTransaction({
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parsed,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="tx-description" className="sr-only">Description</label>
          <input
            id="tx-description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(""); }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="tx-amount" className="sr-only">Amount</label>
          <input
            id="tx-amount"
            type="number"
            placeholder="Amount"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError(""); }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="tx-type" className="sr-only">Type</label>
          <select id="tx-type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="tx-category" className="sr-only">Category</label>
          <select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}

export default TransactionForm;
