import { useState, createContext, useContext } from 'react';

const ReviewsContext = createContext(null);

export const ReviewsContextProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const getReviews = async (hotelId) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}/reviews`,
      );
      const dataJSON = await data.json();

      if (dataJSON) {
        setReviews(dataJSON);
      }
    } catch {}
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        getReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviewsContext = () => {
  const context = useContext(ReviewsContext);

  return {
    ...context,
  };
};

export default ReviewsContext;
