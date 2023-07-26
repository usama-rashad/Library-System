import "./BookCarousel.scss";
import React, { useEffect, useState } from "react";

function BookCarousel({ bookData }) {
  const [booksDisplay, setBooksDisplay] = useState();

  useEffect(() => {
    let books = bookData.map((book) => {
      return book;
    });
    setBooksDisplay(books);
  }, [bookData]);

  return (
    <div className="mainBookCarousel">
      {booksDisplay &&
        booksDisplay.map((book, index) => {
          return (
            <div key={index} className="bookItem">
              <p>{book.name}</p>
              <p>{book.author}</p>
              <p>ISBN: {book.ISBN}</p>
            </div>
          );
        })}
    </div>
  );
}

export default BookCarousel;
