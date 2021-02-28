import { useReducer, createContext, useContext } from 'react';

const ReviewsContext = createContext(null);

const initialState = {
  isAdded: false,
  reviews: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setReviews':
      return {
        reviews: action.payload,
      };
    case 'addReview':
      return {
        reviews: [...state.reviews, action.payload],
        isAdded: true,
      };
    default:
      return state;
  }
};

export const ReviewsContextProvider = ({ children }) => {
  const [{ reviews, isAdded }, dispatch] = useReducer(reducer, initialState);

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

  const addReview = async ({ title, rating, description, hotelId }) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews`,
        {
          method: 'POST',
          body: JSON.stringify({
            title,
            rating,
            description,
            id: Math.floor(Math.random() * 100),
            hotelId,
          }),
        },
      );
      const dataJSON = await data.json();

      if (dataJSON.id) {
        dispatch({
          type: 'addReview',
          payload: { title, rating, description, hotelId },
        });
      }
    } catch {}
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        isAdded,
        getReviews,
        addReview,
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
