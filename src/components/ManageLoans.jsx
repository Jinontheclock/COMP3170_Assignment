import React, { useState } from "react";import React, { useState, useMemo } from "react";

import "./ManageLoans.css";import "./ManageLoans.css";



const LOAN_PERIODS = [1, 2, 3, 4];const LOAN_PERIODS = [1, 2, 3, 4];



function ManageLoans({ books, borrowedBooks, onBorrow }) {function ManageLoans({ books, borrowedBooks, onBorrow }) {

  const [borrowerName, setBorrowerName] = useState("");  const [borrowerName, setBorrowerName] = useState("");

  const [selectedBook, setSelectedBook] = useState("");  const [selectedBook, setSelectedBook] = useState("");

  const [loanPeriod, setLoanPeriod] = useState(1);  const [loanPeriod, setLoanPeriod] = useState(1);



  const handleSubmit = (e) => {  const handleSubmit = (e) => {

    e.preventDefault();    e.preventDefault();

    if (borrowerName.trim() && selectedBook) {    if (borrowerName.trim() && selectedBook) {

      onBorrow(selectedBook, borrowerName, loanPeriod);      onBorrow(selectedBook, borrowerName, loanPeriod);

      setBorrowerName("");      setBorrowerName("");

      setSelectedBook("");      setSelectedBook("");

      setLoanPeriod(1);      setLoanPeriod(1);

    }    }

  };  };



  const borrowedSet = new Set(borrowedBooks.map(b => b.isbn13));  const borrowedSet = new Set(borrowedBooks.map(b => b.isbn13));

  const availableBooks = books.filter(book => !borrowedSet.has(book.isbn13));  const availableBooks = books.filter(book => !borrowedSet.has(book.isbn13));

  const calculateDueDate = (period, loanDate) => {

  const calculateDueDate = (period, loanDate) => {    const startDate = new Date(loanDate);

    const startDate = new Date(loanDate);    const dueDate = new Date(startDate);

    const dueDate = new Date(startDate);    dueDate.setDate(dueDate.getDate() + (period * 7));

    dueDate.setDate(dueDate.getDate() + (period * 7));    return dueDate.toLocaleDateString('en-US', { 

    return dueDate.toLocaleDateString('en-US', {       year: 'numeric', 

      year: 'numeric',       month: 'long', 

      month: 'long',       day: 'numeric' 

      day: 'numeric'     });

    });  };

  };

  return (

  return (    <div className="manage-loans">

    <div className="manage-loans">      <div className="manage-loans-header">

      <div className="manage-loans-header">        <h2>Manage Loans</h2>

        <h2>Manage Loans</h2>        <p className="loans-count">

        <p className="loans-count">          {borrowedBooks.length} book{borrowedBooks.length !== 1 ? "s" : ""} currently borrowed

          {borrowedBooks.length} book{borrowedBooks.length !== 1 ? "s" : ""} currently borrowed        </p>

        </p>      </div>

      </div>

      {availableBooks.length === 0 ? (

      {availableBooks.length === 0 ? (        <div className="no-available-message">

        <div className="no-available-message">          There are no available books to borrow

          There are no available books to borrow        </div>

        </div>      ) : (

      ) : (        <div className="loan-form-section">

        <div className="loan-form-section">          <form onSubmit={handleSubmit} className="loan-form">

          <form onSubmit={handleSubmit} className="loan-form">            <div className="form-group">

            <div className="form-group">              <label htmlFor="borrower">Borrower</label>

              <label htmlFor="borrower">Borrower</label>              <input

              <input                type="text"

                type="text"                id="borrower"

                id="borrower"                className="form-input"

                className="form-input"                value={borrowerName}

                value={borrowerName}                onChange={(e) => setBorrowerName(e.target.value)}

                onChange={(e) => setBorrowerName(e.target.value)}                placeholder="Enter borrower name"

                placeholder="Enter borrower name"                required

                required              />

              />            </div>

            </div>

            <div className="form-group">

            <div className="form-group">              <label htmlFor="book">Book</label>

              <label htmlFor="book">Book</label>              <select

              <select                id="book"

                id="book"                className="form-select"

                className="form-select"                value={selectedBook}

                value={selectedBook}                onChange={(e) => setSelectedBook(e.target.value)}

                onChange={(e) => setSelectedBook(e.target.value)}                required

                required              >

              >                <option value="">Choose a book...</option>

                <option value="">Choose a book...</option>                {availableBooks.map(book => (

                {availableBooks.map(book => (                  <option key={book.isbn13} value={book.isbn13}>

                  <option key={book.isbn13} value={book.isbn13}>                    {book.title}

                    {book.title}                  </option>

                  </option>                ))}

                ))}              </select>

              </select>            </div>

            </div>

            <div className="form-group">

            <div className="form-group">              <label htmlFor="period">Loan Period (in weeks)</label>

              <label htmlFor="period">Loan Period (in weeks)</label>              <select

              <select                id="period"

                id="period"                className="form-select"

                className="form-select"                value={loanPeriod}

                value={loanPeriod}                onChange={(e) => setLoanPeriod(Number(e.target.value))}

                onChange={(e) => setLoanPeriod(Number(e.target.value))}                required

                required              >

              >                {LOAN_PERIODS.map(period => (

                {LOAN_PERIODS.map(period => (                  <option key={period} value={period}>

                  <option key={period} value={period}>                    {period} week{period !== 1 ? "s" : ""}

                    {period} week{period !== 1 ? "s" : ""}                  </option>

                  </option>                ))}

                ))}              </select>

              </select>            </div>

            </div>

            <button type="submit" className="submit-button">

            <button type="submit" className="submit-button">              Create Loan

              Create Loan            </button>

            </button>          </form>

          </form>        </div>

        </div>      )}

      )}

      {borrowedBooks.length > 0 && (

      {borrowedBooks.length > 0 && (        <div className="currently-on-loan-section">

        <div className="currently-on-loan-section">          <h3 className="currently-on-loan-title">Currently on loan</h3>

          <h3 className="currently-on-loan-title">Currently on loan</h3>          <div className="loans-list">

          <div className="loans-list">            {borrowedBooks.map((loan) => (

            {borrowedBooks.map((loan) => (              <div key={loan.isbn13} className="loan-list-item">

              <div key={loan.isbn13} className="loan-list-item">                <div className="loan-image-container">

                <div className="loan-image-container">                  <img src={loan.image} alt={loan.title} className="loan-book-image" />

                  <img src={loan.image} alt={loan.title} className="loan-book-image" />                </div>

                </div>                <div className="loan-details">

                <div className="loan-details">                  <p className="loan-borrower">Borrower: {loan.borrower}</p>

                  <p className="loan-borrower">Borrower: {loan.borrower}</p>                  <p className="loan-title">{loan.title}</p>

                  <p className="loan-title">{loan.title}</p>                  <p className="loan-due-date">Due date: {calculateDueDate(loan.period, loan.loanDate)}</p>

                  <p className="loan-due-date">Due date: {calculateDueDate(loan.period, loan.loanDate)}</p>                </div>

                </div>              </div>

              </div>            ))}

            ))}          </div>

          </div>        </div>

        </div>      )}

      )}    </div>

    </div>  );

  );}

}

export default ManageLoans;

export default ManageLoans;
