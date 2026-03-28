import { useState, useEffect, useRef } from 'react';
import { categories } from './constants';

function TransactionList({ transactions, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef(null);

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const deleteTarget = deleteId !== null
    ? transactions.find(t => t.id === deleteId)
    : null;

  useEffect(() => {
    if (deleteId === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDeleteId(null);
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal');
        if (!modal) return;
        const focusable = modal.querySelectorAll('button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    cancelRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [deleteId]);

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <label htmlFor="filter-type" className="sr-only">Filter by type</label>
        <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="filter-category" className="sr-only">Filter by category</label>
        <select id="filter-category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">No transactions found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>
                  <span className={`category-badge ${t.category}`}>
                    {t.category}
                  </span>
                </td>
                <td className={`amount-cell ${t.type}`}>
                  {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => setDeleteId(t.id)}
                    aria-label={`Delete ${t.description} transaction`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {deleteId !== null && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)} role="dialog" aria-modal="true" aria-label="Confirm deletion">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>
              Are you sure you want to delete
              {deleteTarget ? ` "${deleteTarget.description}"` : " this transaction"}?
            </p>
            <div className="modal-actions">
              <button ref={cancelRef} onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="delete-confirm-btn" onClick={() => { onDeleteTransaction(deleteId); setDeleteId(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
