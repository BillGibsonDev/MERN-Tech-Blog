// styled
import styled from 'styled-components';

// form
import ContactForm from './components/ContactForm';

export default function Contact () {
    return (
        <StyledContact>
            <div className="contact-wrapper">
                <h1>Contact</h1>
                <h2>Directly send a message with any questions or concerns.</h2>
                <ContactForm />
            </div>
        </StyledContact >
    )
}

const StyledContact = styled.div`
    background: white;
    border-radius: 12px;
    margin: 20px auto;
    width: 95%;
    max-width: 875px;
    .contact-wrapper {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 95%;
        margin: auto;
        h1 {
            display: flex;
            justify-content: center;
            border-bottom: 2px #3a3a3a solid;
            width: 50%;
            font-size: 2em;
            margin-bottom: 20px;
            color: #3a3a3a;
        }
        h2 {
            font-size: 1.2em;
            color: #3a3a3a;
            text-align: center;
        }
    }
`;