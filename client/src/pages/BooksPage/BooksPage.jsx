import "./BooksPage.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Components
import Navbar from "../../components/UI/Navbar/Navbar";
import BookCarousel from "../../components/UI/BookCarousel/BookCarousel";
import SearchBar from "../../components/UI/SearchBar/SearchBar";

// Hooks
import useAuthBlurState from "../../hooks/useAuthBlurState";

const YourBooksCarousel = [
  { name: "Programming with C++", author: "Usama", ISBN: "111" },
  { name: "Programming with C++", author: "Emad", ISBN: "112" },
  { name: "Programming with C++", author: "Hadi", ISBN: "113" },
  { name: "Programming with C++", author: "Ayesha", ISBN: "114" },
  { name: "Programming with C++", author: "Usama", ISBN: "115" },
  { name: "Programming with C++", author: "Usama", ISBN: "116" },
  { name: "Programming with C++", author: "Usama", ISBN: "117" },
  { name: "Programming with C++", author: "Usama", ISBN: "118" },
  { name: "Programming with C++", author: "Usama", ISBN: "119" },
  { name: "Programming with C++", author: "Usama", ISBN: "120" },
  { name: "Programming with C++", author: "Usama", ISBN: "121" },
  { name: "Programming with C++", author: "Usama", ISBN: "122" },
];

function BooksPage() {
  const { authState, blurText } = useAuthBlurState();

  return (
    <div className="mainBooksPage">
      <div className="booksTop">
        <Navbar />
      </div>
      <div className="booksMiddle">
        <SearchBar />
      </div>
      <div className={`booksBottom ${blurText}`}>
        <div className="yourBooks carousel">
          <p className="title">Your Books</p>
          <BookCarousel bookData={YourBooksCarousel} />
        </div>
        <div className="bestSellers carousel">
          <p className="title">Bestsellers</p>
          <BookCarousel bookData={YourBooksCarousel} />
        </div>
        <div className="newBooks carousel">
          <p className="title">New Books</p>
          <BookCarousel bookData={YourBooksCarousel} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
