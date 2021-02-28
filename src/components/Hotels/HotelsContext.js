import { useReducer, createContext, useContext } from 'react';

const HotelsContext = createContext(null);

const initialState = {
  loading: true,
  error: false,
  hotels: [],
  hotel: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setHotels':
      return {
        loading: false,
        hotels: action.payload,
      };
    case 'setHotel':
      return {
        loading: false,
        hotel: action.payload,
      };
    case 'setError':
      return {
        error: true,
      };
    default:
      return state;
  }
};

export const HotelsContextProvider = ({ children }) => {
  const [{ loading, error, hotels, hotel }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  async function getHotels() {
    try {
      const data = await fetch(
        'https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels',
      );
      const dataJSON = await data.json();

      if (dataJSON) {
        dispatch({ type: 'setHotels', payload: dataJSON });
      }
    } catch {
      dispatch({ type: 'setError' });
    }
  }

  async function getHotel(hotelId) {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}`,
      );
      const dataJSON = await data.json();

console.log({ dataJSON });

      if (dataJSON) {
        dispatch({ type: 'setHotel', payload: dataJSON });
      }
    } catch {
      dispatch({ type: 'setError' });
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        loading,
        error,
        hotels,
        hotel,
        getHotels,
        getHotel,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};

export const useHotelsContext = () => {
  const context = useContext(HotelsContext);

  return {
    ...context,
  };
};

export default HotelsContext;
