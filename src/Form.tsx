import React from 'react';
import { useForm } from 'react-hook-form';
import { Book } from './Book';
import { useNavigate } from 'react-router-dom';

const Form: React.FC = () => {
  const { register, handleSubmit } = useForm<Book>();
  const navigate = useNavigate();

  async function onSubmit(data: Book) {
    await fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(data)
    })
    navigate('/list');
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <div>
      <label>
        ISBN:
        <input type="text" {...register('ISBN')} data-testid="ISBN-input" />
      </label>
    </div>
    <div>
      <label>
        Titel:
        <input type="text" {...register('title')} data-testid="title-input" />
      </label>
    </div>
    <div>
      <label>
        Autor:
        <input type="text" {...register('author')} data-testid="author-input" />
      </label>
    </div>
    <div>
      <label>
        Preis:
        <input type="text" {...register('price')} data-testid="price-input" />
      </label>
    </div>
    <div>
      <label>
        Seiten:
        <input type="text" {...register('pages')} data-testid="pages-input" />
      </label>
    </div>
    <div>
      <label>
        Erscheinungsjahr:
        <input type="text" {...register('year')} data-testid="year-input" />
      </label>
    </div>
    <div>
      <button type="submit">speichern</button>
    </div>
  </form>
};

export default Form;