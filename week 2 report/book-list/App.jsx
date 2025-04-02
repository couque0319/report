import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const addBook = (title, author) => {
    setBooks([...books, { title, author }]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>📚 책 리스트 정리</h1>
      <BookForm onAddBook={addBook} />
      <BookList books={books} />
    </div>
  );
}

export default App;
