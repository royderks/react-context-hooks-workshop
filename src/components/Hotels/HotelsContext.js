import { useState, useEffect, createContext } from 'react';

const HotelsContext = createContext(null);

export const HotelsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          'https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels',
        );
        const dataJSON = await data.json();

        if (dataJSON) {
          setHotels(dataJSON);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    !hotels.length && fetchData();
  }, [hotels.length]);

  const getReviews = async (hotelId) => {
    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}/reviews`,
      );
      const dataJSON = await data.json();

      if (dataJSON) {
        setReviews(dataJSON);
      }
    } catch {
      setError(true);
    }
  };

  return (
    <HotelsContext.Provider
      value={{
        loading,
        error,
        hotels,
        reviews,
        getReviews,
      }}
    >
      {children}
    </HotelsContext.Provider>
  );
};

export default HotelsContext;
