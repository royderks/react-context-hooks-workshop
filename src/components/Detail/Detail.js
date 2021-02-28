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
  const { loading, error, hotels, getHotels } = useHotelsContext();
  const { reviews, getReviews } = useReviewsContext();

  useEffect(() => {
    (!hotels || !hotels.length) && getHotels();
  }, [getHotels, hotels]);

  const hotel =
    hotels && hotels.find((hotel) => hotel.id.toString() === match.params.id);

  useEffect(() => {
    async function fetchReviews(hotelId) {
      await getReviews(hotelId);
    }

    hotel && hotel.id && getReviews && !reviews.length && fetchReviews(hotel.id);
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
