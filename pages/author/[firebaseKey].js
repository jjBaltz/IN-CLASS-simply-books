/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthorBooks } from '../../api/authorData';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const [books, setBooks] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getAuthorBooks(firebaseKey).then(setBooks);
  }, [firebaseKey]);

  return (
    <>
      <div className="d-flex">
        <div className="mt-5" />
        <div className="d-flex flex-column text-white mt-5 details">
          <h2>
            {authorDetails.first_name} {authorDetails.last_name}
            {authorDetails.favorite ? ' 🤍' : ''}
          </h2>
          <h4>Author Email: <a href={`mailto:${authorDetails.email}`}>{authorDetails.email}</a></h4>
        </div>
      </div>
      <br />
      <h3 className="text-white details text-left">Author&apos;s Books</h3>
      <div className="d-flex flex-wrap">
        {books.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthorBooks} />
        ))}
      </div>
    </>
  );
}
