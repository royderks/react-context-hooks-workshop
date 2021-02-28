import { useReducer, createContext, useContext } from 'react';

const HotelsContext = createContext(null);

const initialState = {
  loading: true,
  error: false,
  hotels: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setHotels':
      console.log({ state, action });
      return {
        loading: false,
        hotels: action.payload,
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
  const [{ loading, error, hotels }, dispatch] = useReducer(
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

  return (
    <HotelsContext.Provider
      value={{
        loading,
        error,
        hotels,
        getHotels,
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
