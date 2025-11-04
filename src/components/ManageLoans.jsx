import React, { useState } from "react";
import "./ManageLoans.css";

const LOAN_PERIODS = [1, 2, 3, 4];

function ManageLoans({ books, borrowedBooks, onBorrow }) {
  const [borrowerName, setBorrowerName] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [loanPeriod, setLoanPeriod] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (borrowerName.trim() && selectedBook) {
      onBorrow(selectedBook, borrowerName, loanPeriod);
      setBorrowerName("");
      setSelectedBook("");
      setLoanPeriod(1);
    }
  };

  const borrowedSet = new Set(borrowedBooks.map(b => b.isbn13));
  const availableBooks = books.filter(book => !borrowedSet.has(book.isbn13));

  const calculateDueDate = (period, loanDate) => {
    const startDate = new Date(loanDate);
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + (period * 7));
    return dueDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="manage-loans">
      <div className="manage-loans-header">
        <h2>Manage Loans</h2>
        <p className="loans-count">
          {borrowedBooks.length} book{borrowedBooks.length !== 1 ? "s" : ""} currently borrowed
        </p>
      </div>

      {availableBooks.length === 0 ? (
        <div className="no-available-message">
          There are no available books to borrow
        </div>
      ) : (
        <div className="loan-form-section">
          <form onSubmit={handleSubmit} className="loan-form">
            <div className="form-group">
              <label htmlFor="borrower">Borrower</label>
              <input
                type="text"
                id="borrower"
                className="form-input"
                value={borrowerName}
                onChange={(e) => setBorrowerName(e.target.value)}
                placeholder="Enter borrower name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="book">Book</label>
              <select
                id="book"
                className="form-select"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                required
              >
                <option value="">Choose a book...</option>
                {availableBooks.map(book => (
                  <option key={book.isbn13} value={book.isbn13}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="period">Loan Period (in weeks)</label>
              <select
                id="period"
                className="form-select"
                value={loanPeriod}
                onChange={(e) => setLoanPeriod(Number(e.target.value))}
                required
              >
                {LOAN_PERIODS.map(period => (
                  <option key={period} value={period}>
                    {period} week{period !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-button">
              Create Loan
            </button>
          </form>
        </div>
      )}

      {borrowedBooks.length > 0 && (
        <div className="currently-on-loan-section">
          <h3 className="currently-on-loan-title">Currently on loan</h3>
          <div className="loans-list">
            {borrowedBooks.map((loan) => (
              <div key={loan.isbn13} className="loan-list-item">
                <div className="loan-image-container">
                  <img src={loan.image} alt={loan.title} className="loan-book-image" />
                </div>
                <div className="loan-details">
                  <p className="loan-borrower">Borrower: {loan.borrower}</p>
                  <p className="loan-title">{loan.title}</p>
                  <p className="loan-due-date">Due date: {calculateDueDate(loan.period, loan.loanDate)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageLoans;
