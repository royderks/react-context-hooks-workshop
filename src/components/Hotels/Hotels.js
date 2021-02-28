import { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SubHeader from '../Header/SubHeader';
import HotelItem from './HotelItem';
import { useHotelsContext } from './HotelsContext';

const HotelItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const HotelLink = styled(Link)`
  color: black;
  text-decoration: none;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Hotels = ({ history }) => {
  const { loading, error, hotels, getHotels } = useHotelsContext();

  useEffect(() => {
    (!hotels || !hotels.length) && getHotels();
  }, [getHotels, hotels]);

  return !loading && !error ? (
    <>
      {history && <SubHeader title='Your Lists' />}
      <HotelItemsWrapper>
        {hotels &&
          hotels.map((hotel) => (
            <HotelLink key={hotel.id} to={`hotel/${hotel.id}`} hotel={hotel}>
              <HotelItem data={hotel} />
            </HotelLink>
          ))}
      </HotelItemsWrapper>
    </>
  ) : (
    <Alert>{loading ? 'Loading...' : error}</Alert>
  );
};

export default Hotels;
