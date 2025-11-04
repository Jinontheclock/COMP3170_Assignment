import React from 'react';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import ManageLoans from '../components/ManageLoans';

function HomePage({
  showManageLoans,
  setShowManageLoans,
  selectedPublisher,
  setSelectedPublisher,
  selectedLanguage,
  setSelectedLanguage,
  publishers,
  languages,
  books,
  borrowedBooks,
  handleBorrowBook,
  openModal,
  hasSelected,
  handleDelete,
  handleEdit,
  filteredBooks,
  handleSelect,
  isBorrowedSet,
  isModalOpen,
  newBook,
  handleChange,
  handleSubmit,
  closeModal,
  isEditMode
}) {
  return (
    <>
      <div className="top-controls">
        <button 
          className="manage-loans-button"
          onClick={() => setShowManageLoans(!showManageLoans)}
        >
          {showManageLoans ? 'Quit' : 'Manage Loans'}
        </button>

        {!showManageLoans && (
          <div className="filters">
            <div className="filter-group">
              <label className="filter-label">
                Publisher
              </label>
              <select 
                className="filter-select"
                value={selectedPublisher} 
                onChange={(e) => setSelectedPublisher(e.target.value)}
              >
                {publishers.map(pub => (
                  <option key={pub} value={pub}>{pub}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Language
              </label>
              <select 
                className="filter-select"
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <main>
        {showManageLoans ? (
          <ManageLoans 
            books={books}
            borrowedBooks={borrowedBooks}
            onBorrow={handleBorrowBook}
          />
        ) : (
          <div className="main">
            <div className="new" onClick={openModal}>
              <BookCard />
              <div className="button-container">
                <button
                  className="action-button"
                  disabled={!hasSelected}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleDelete();
                  }}
                >
                  Delete
                </button>
                <button
                  className="action-button"
                  disabled={!hasSelected}
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleEdit();
                  }}
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="content">
              {filteredBooks.map((book) => (
                <BookCard {...book}
                  key={book.isbn13}
                  selected={book.selected}
                  onSelect={handleSelect}
                  isBorrowed={isBorrowedSet.has(book.isbn13)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">&#169; Hajin Lee, 2025</footer>

      {isModalOpen && (
        <BookForm
          newBook={newBook}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClose={closeModal}
          isEditMode={isEditMode}
        />
      )}
    </>
  );
}

export default HomePage;