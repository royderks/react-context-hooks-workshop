import React from 'react';
import { HotelsContextProvider } from './Hotels/HotelsContext';
import { ReviewsContextProvider } from './Detail/ReviewsContext';

const GlobalContext = ({ children }) => {
  return (
    <HotelsContextProvider>
        <ReviewsContextProvider>
            {children}
        </ReviewsContextProvider>
    </HotelsContextProvider>
  );
};

export default GlobalContext;