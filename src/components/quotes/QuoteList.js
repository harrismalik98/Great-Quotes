import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
// 1 indicating that quoteA should come after quoteB.
// -1 indicating that quoteA should come before quoteB.



const QuoteList = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location.pathname); // /quotes
  // console.log(location.search); // ?sort=asc

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';
  // console.log(queryParams.get('sort'));

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // navigate(`${location.pathname}?sort=${isSortingAscending ? 'desc' : 'asc'}`);
    navigate(`/Great-Quotes?sort=${isSortingAscending ? "desc" : "asc"}`)
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>Sort {isSortingAscending ? "Decending" : " Ascending"}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
