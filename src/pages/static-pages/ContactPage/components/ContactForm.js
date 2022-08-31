// styled
import styled from 'styled-components';

// formspree
import { useForm, ValidationError } from '@formspree/react';

// styled
import {StyledButton} from '../../../../Styled/StyledButton.js';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xqkjaegv");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <StyledForm>
      <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        placeholder='Your email'
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        placeholder='Your message'
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <StyledButton type="submit" disabled={state.submitting}>
        Submit
      </StyledButton>
    </form>
    </StyledForm>
  );
}


const StyledForm = styled.div`
  width: 70%;
  margin: 5% auto;
  height: 100%;
  background: lightgray;
  border-radius: 12px;
  @media (max-width: 1000px){
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 5% auto;
    height: 100%;
    @media (max-width: 1000px){
      width: 90%;
    }
    label {
      margin: 0;
    }
    button, input, textarea {
      margin: auto;
    }
    input {
      width: 100%;
      height: 30px;
      background: white;
    }
    textarea, input {
      padding: 2px;
      font-size: 1em;
      font-weight: normal;
      margin-bottom: 10px;
    }
    textarea{
      height: 200px;
      width: 100%;
    }
    button {
      &:hover{
        color: white;
        background: black;
      }
    }
  }
`;
