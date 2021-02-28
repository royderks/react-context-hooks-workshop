import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import { HotelsContext } from '../Hotels/HotelsContext';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { hotels } = useContext(HotelsContext);

  const hotel =
    hotels && hotels.find((hotel) => hotel.id.toString() === match.params.id);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(
          `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotel.id}/reviews`,
        );
        const dataJSON = await data.json();

        if (data) {
          setReviews(dataJSON);
        }
      } catch {
        setError(true);
      }

      setLoading(false);
    }

    hotel && hotel.id && fetchData();
  }, [hotel]);

  return !loading && !error ? (
    <>
      {history && hotel && (
        <SubHeader
          goBack={() => history.goBack()}
          title={hotel.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      {hotel && <HotelItem data={hotel} />}

      <h3>Reviews:</h3>
      <ReviewsWrapper>
        {reviews && reviews.map((review) => <ReviewItem data={review} />)}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
