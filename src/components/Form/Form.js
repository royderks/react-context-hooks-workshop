import { useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../Header/SubHeader';
import FormInput from './FormInput';
import Button from '../Button/Button';

const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const SubmitButton = styled(Button)`
  background: blue;
  margin: 2% 0;
`;

const Form = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(
        `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/reviews`,
        {
          method: 'POST',
          body: JSON.stringify({
            title,
            rating,
            description,
            id: Math.floor(Math.random() * 100),
            hotelId: parseInt(match.params.id),
          }),
        },
      );
      const dataJSON = await data.json();

      if (dataJSON.id) {
        console.log('Success');
      }
    } catch {
      console.log('Error');
    }

    history.goBack();
  };

  return (
    <>
      {history && (
        <SubHeader goBack={() => history.goBack()} title={`Add Review`} />
      )}
      <FormWrapper>
        <form onSubmit={handleOnSubmit}>
          <FormInput
            id='title'
            label='Title'
            placeholder='Insert title'
            value={title}
            handleOnChange={setTitle}
          />
          <FormInput
            id='rating'
            label='Rating'
            type='number'
            placeholder='0'
            max={5}
            value={rating}
            handleOnChange={setRating}
          />
          <FormInput
            id='description'
            label='Description'
            type='textarea'
            placeholder='Lorem ipsum...'
            value={description}
            handleOnChange={setDescription}
          />
          <SubmitButton>Add Review</SubmitButton>
        </form>
      </FormWrapper>
    </>
  );
};

export default Form;
