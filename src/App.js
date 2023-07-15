import React, { Suspense } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';

import AllQuotes from './pages/AllQuotes'; // DON'T NEED TO APPLY LAZY LOADING CAUSE THIS IS HOMEPAGE.
// import QuoteDetail from './pages/QuoteDetail';
// import NewQuote from './pages/NewQuote';
// import NotFound from './pages/NotFound';

import Layout from './components/layout/Layout';
import Comments from './components/comments/Comments';
import LoadingSpinner from './components/UI/LoadingSpinner';

const QuoteDetail = React.lazy(()=> import('./pages/QuoteDetail'));
const NewQuote = React.lazy(() => import('./pages/NewQuote'));
const NotFound = React.lazy(()=> import('./pages/NotFound'));


function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner /></div>} >
        <Routes>
          <Route path='/' element={<Navigate replace to='/Great-Quotes' />} />
          <Route path='/Great-Quotes' element={<AllQuotes />} />
          <Route path='/Great-Quotes/:quoteId' element={<QuoteDetail />}>
            <Route
              path=''
              element={
                <div className='centered'>
                  <Link className='btn--flat' to={`comments`}>
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path={`comments`} element={<Comments />} />
          </Route>
          <Route path='/new-quote' element={<NewQuote />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;