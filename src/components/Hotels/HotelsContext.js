import { useState, useEffect, createContext } from 'react';

export const HotelsContext = createContext(null);

const HotelsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          'https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels',
        );
        const dataJSON = await data.json();

        if (data) {
          setHotels(dataJSON);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    !hotels.length && fetchData();
  }, [hotels.length]);

  return (
    <HotelsContext.Provider
      value={{
        loading,
        error,
        hotels,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsContextProvider;
