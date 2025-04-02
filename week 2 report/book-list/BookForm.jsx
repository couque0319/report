import React, { useState } from 'react';

function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      onAddBook(title, author);
      setTitle('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="책 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="저자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '8px 16px' }}>추가</button>
    </form>
  );
}

export default BookForm;
