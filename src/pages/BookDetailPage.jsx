import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import './BookDetails.css';

const COMMON_WORDS = ['the', 'and', 'for', 'with', 'in', 'on', 'at', 'to', 'of'];
const API_ENDPOINT = 'https://api.itbook.store/1.0/search';
const MAX_SIMILAR_BOOKS = 6;
const MIN_WORD_LENGTH = 2;

function BookDetailPage({ books }) {
  const { isbn13 } = useParams();
  const navigate = useNavigate();
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const book = books.find(b => b.isbn13 === isbn13);

  const getSearchQuery = useCallback((book) => {
    if (!book?.title) return '';

    const significantWord = book.title
      .split(' ')
      .find(word => 
        word.length > MIN_WORD_LENGTH && 
        !COMMON_WORDS.includes(word.toLowerCase())
      );
    return significantWord || 
           book.publisher || 
           (book.author?.split(' ')[0]) || 
           book.title.split(' ')[0] || 
           '';
  }, []);

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      if (!book) return;
      
      setIsLoading(true);
      try {
        const searchQuery = getSearchQuery(book);
        if (!searchQuery) {
          setSimilarBooks([]);
          return;
        }

        const response = await fetch(`${API_ENDPOINT}/${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();
        
        const filteredBooks = data.books
          ?.filter(b => b.isbn13 !== isbn13)
          ?.slice(0, MAX_SIMILAR_BOOKS) || [];
          
        setSimilarBooks(filteredBooks);
      } catch (error) {
        console.error('Error fetching similar books:', error);
        setSimilarBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarBooks();
  }, [book, isbn13, getSearchQuery]);

  if (!book) {
    return (
      <div className="book-detail-page">
        <div className="book-detail-container">
          <h2>Book not found</h2>
          <button className="back-button" onClick={() => navigate('/')}>Back to List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <button className="back-button" onClick={() => navigate('/')}>Back to List</button>
        <div className="book-details">
          <div className="book-details-image">
            <img src={book.image} alt={book.title} />
          </div>
          <div className="book-details-info">
            <h2>{book.title}</h2>
            {book.subtitle && <h3 className="book-subtitle">{book.subtitle}</h3>}
            <div className="book-details-row">
              <span className="label">Author:</span>
              <span>{book.author || 'Not specified'}</span>
            </div>
            <div className="book-details-row">
              <span className="label">Publisher:</span>
              <span>{book.publisher}</span>
            </div>
            <div className="book-details-row">
              <span className="label">Year:</span>
              <span>{book.year || 'Not specified'}</span>
            </div>
            <div className="book-details-row">
              <span className="label">Language:</span>
              <span>{book.language}</span>
            </div>
            <div className="book-details-row">
              <span className="label">Pages:</span>
              <span>{book.pages || 'Not specified'}</span>
            </div>
            <div className="book-details-row">
              <span className="label">ISBN-13:</span>
              <span>{book.isbn13}</span>
            </div>
            <div className="book-details-row">
              <span className="label">Price:</span>
              <span>{book.price}</span>
            </div>
            {book.url && (
              <div className="book-details-actions">
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="learn-more-button"
                >
                  Learn More
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="similar-books-section">
          <h2 className="similar-books-title">Similar Books</h2>
          <div className="similar-books-container">
            {isLoading ? (
              <div className="loading">Loading similar books...</div>
            ) : similarBooks.length > 0 ? (
              similarBooks.map(book => (
                <BookCard
                  key={book.isbn13}
                  isbn13={book.isbn13}
                  title={book.title}
                  subtitle={book.subtitle}
                  price={book.price}
                  image={book.image}
                  url={book.url}
                />
              ))
            ) : (
              <div className="no-similar-books">No similar books found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;