import React from 'react';

function BookList({ books }) {
  return (
    <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
      {books.map((book, index) => (
        <li key={index} style={{ marginBottom: '8px', borderBottom: '1px solid #ccc', paddingBottom: '4px' }}>
          📖 <strong>{book.title}</strong> - {book.author}
        </li>
      ))}
    </ul>
  );
}

export default BookList;
