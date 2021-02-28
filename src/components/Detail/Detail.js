import React from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import HotelItem from '../Hotels/HotelItem';

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
  // Get this information from the API
  const loading = true;
  const error = false;
  const hotel = false;

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

      <h3>Reviews:</h3>
      <ReviewsWrapper></ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Detail;
