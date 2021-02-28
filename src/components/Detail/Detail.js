import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import ReviewItem from './ReviewItem';

const ReviewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Detail = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hotel, setHotel] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${match.params.id}`,
        );
        const dataJSON = await data.json();

        if (dataJSON) {
          setHotel(dataJSON);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    fetchData();
  }, [match.params.id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotel.id}/reviews`,
        );
        const dataJSON = await data.json();

        if (dataJSON) {
          setReviews(dataJSON);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    fetchData();
  }, [hotel.id]);

  return !loading && !error ? (
    <>
      {history && hotel && (
        <SubHeader
          goBack={() => history.goBack()}
          title={hotel.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <HotelItem data={hotel} />

      <p>
        <h3>Reviews:</h3>
      </p>
      <ReviewsWrapper>
        {reviews && reviews.map((review) => <ReviewItem data={review} />)}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
