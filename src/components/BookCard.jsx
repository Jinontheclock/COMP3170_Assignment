import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookCard.css";

function BookCard(props) {
  const { isbn13, title, subtitle, price, image, url, selected, onSelect, isBorrowed } = props;
  const navigate = useNavigate();
  return (
      <div
      className={`book-card${selected ? " selected" : ""}`}
      onClick={() => onSelect && onSelect(isbn13)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && onSelect) onSelect(isbn13);
      }}
    >

      {isBorrowed && (
        <div className="on-loan-banner">On loan</div>
      )}

      {image ? (
        <img src={image} alt={title} className="book-image" />
      ) : (
        <div className="placeholder">Add New Book</div>
      )}

      <div className="book-info">
        <h3 className="book-title">{title}</h3>
        {subtitle && <h3 className="book-subtitle">{subtitle}</h3>}
        {price && <p className="book-price">{price}</p>}
      </div>

      <div className="book-actions">
        <button
          className="learn-more"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/book/${isbn13}`);
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default BookCard;