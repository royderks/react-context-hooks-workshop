import { useEffect } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';
import { useHotelsContext } from '../Hotels/HotelsContext';
import { useReviewsContext } from './ReviewsContext';

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
  const { loading, error, hotel, getHotel } = useHotelsContext();
  const { reviews = [], getReviews, isAdded } = useReviewsContext();

  useEffect(() => {
    (!hotel || !hotel.id) && getHotel(match.params.id);
  }, [getHotel, hotel, match.params.id]);

  useEffect(() => {
    async function fetchReviews(hotelId) {
      await getReviews(hotelId);
    }

    hotel && hotel.id && !reviews.length && fetchReviews(hotel.id);
  }, [getReviews, hotel, reviews.length]);

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
      {isAdded && <Alert>Successfully added new review!</Alert>}
      <ReviewsWrapper>
        {reviews &&
          reviews.map((review) => <ReviewItem key={review.id} data={review} />)}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
