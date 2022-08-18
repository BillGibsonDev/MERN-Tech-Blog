
// formspree
import { useForm, ValidationError } from '@formspree/react';

// styled
import styled from 'styled-components';


export default function EmailForm() {
    const [state, handleSubmit] = useForm("moqyrzov");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }
    return (
      <StyledForm>
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              type="email" 
              name="email"
              placeholder="Subscribe to our Email Newsletter"
            />
            <ValidationError 
              prefix="Email" 
              field="email"
              errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}>
              Join
            </button>
          </form>
      </StyledForm>
    );
}

const StyledForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin: auto;
min-height: 10vh;
h4 {
    font-size: 1.5em;
    color: #1a1a1a;
    margin: auto;
}
form {
    display: flex;
    justify-content: center;
    align-items: center;
    label {
        margin-right: 10px;
        color: #bebebe;
    }
    input {
        height: 30px;
        width: 250px;
        display: flex;
        border-radius: 6px;
        border: none;
        font-size: 1em;
        padding: 3px 0;
    }
    button {
        height: 30px;
        width: 60px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 8px;
        margin-left: 4px;
        font-weight: bold;
        &:hover {
            background: black;
            color: white;
        }
    }
}
`;

