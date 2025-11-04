import React from "react";
import Modal from "./Modal";
import "./BookDetails.css";

function BookDetails({ book, onClose }) {
  if (!book) return null;

  return (
    <Modal onClose={onClose}>
      <div className="book-details">
        <div className="book-details-image">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-details-info">
          <h2>{book.title}</h2>
          <div className="book-details-row">
            <span className="label">Author:</span>
            <span>{book.author}</span>
          </div>
          <div className="book-details-row">
            <span className="label">Publisher:</span>
            <span>{book.publisher}</span>
          </div>
          <div className="book-details-row">
            <span className="label">Publisher:</span>
            <span>{book.publisher}</span>
          </div>
          <div className="book-details-row">
            <span className="label">Year:</span>
            <span>{book.year || "Not specified"}</span>
          </div>
          <div className="book-details-row">
            <span className="label">Language:</span>
            <span>{book.language}</span>
          </div>
          <div className="book-details-row">
            <span className="label">Pages:</span>
            <span>{book.pages || "Not specified"}</span>
          </div>
          <div className="book-details-row">
            <span className="label">ISBN-13:</span>
            <span>{book.isbn13}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BookDetails;