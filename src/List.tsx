import React, { useEffect, useState } from 'react';
import { bookData as books } from './book.data';
import { Book } from './Book';
import { Link } from 'react-router-dom';


async function fetchBooks(): Promise<Book[]> {
  const response = await fetch('/books');
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  const data = await response.json();
  return data;
}

const List: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchBooks().then(data => { setBooks(data); setError(false) }).catch(e => setError(true));
  }, []);

  if (error) {
    return <div data-testid="error">Es ist ein Fehler aufgetreten</div>;
  }

  if (books.length === 0) {
    return <div data-testid="no-data">Es sind keine Datensätze vorhanden</div>;
  }

  async function remove(id: number) {
    const response = await fetch(`http://localhost:5173/books/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setBooks((prevBooks) => {
        return prevBooks.filter(book => book.id !== id);
      })
    }
  }

  return <>
    <h1>Bücherliste</h1>

    <table>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Titel</th>
          <th>Autor</th>
          <th>Preis</th>
          <th>Seiten</th>
          <th>Erscheinungsjahr</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{books.map(book =>
        <tr key={book.ISBN}>
          <td>{book.ISBN}</td>
          <td data-testid="title">{book.title}</td>
          <td>{book.author}</td>
          <td>{book.price}</td>
          <td>{book.pages}</td>
          <td data-testid="year">{book.year}</td>
          <td><button data-testid="delete" onClick={() => remove(book.id!)}>löschen</button></td>
        </tr>
      )}
      </tbody>
    </table>
    <Link to="/create">neu</Link>
  </>
}

export default List;