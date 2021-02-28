import { useReducer, createContext, useContext } from 'react';

const ReviewsContext = createContext(null);

const initialState = {
  reviews: [],
};

const reducer = (state, action) => {
  console.log({ state, action });
  switch (action.type) {
    case 'setReviews':
      return {
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export const ReviewsContextProvider = ({ children }) => {
  const [{ reviews }, dispatch] = useReducer(reducer, initialState);

  const getReviews = async (hotelId) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}/reviews`,
      );
      const dataJSON = await data.json();

      if (dataJSON) {
        dispatch({ type: 'setReviews', payload: dataJSON });
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
