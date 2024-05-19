import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import image from '../data/img/background.jpg'
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.8fr 1fr ;
  @media (max-width: 1100px) {
    grid-template-columns:  1fr ;
  }

`;
const LoginSection = styled.div`
display: grid;
grid-template-columns: 58rem;
align-content: center;
justify-content: center;
gap: 3.2rem;
background-color: var(--color-grey-0);
`;
const EntranceSideBackground = styled.div`
  display:flex;
  align-content: center;
  background-color: var(--color-grey-50);
  @media (max-width: 1100px) {
    display:none;
  }

` ;
const CustomizHeading = styled.h1`
 line-height: 1.4;
 color: var(--color-indigo-700);
 font-size: 2.2rem;
    font-weight: 600;
    text-align: center;
`;


function Login() {
  return (
    <LoginLayout>

      <EntranceSideBackground>
        <img src={image} alt="COZY HOTEL" style={{ height: 'auto' }} />
      </EntranceSideBackground>
      <LoginSection>
        <Logo />
        <CustomizHeading>Log in to your account </CustomizHeading>
        <LoginForm />
      </LoginSection>
    </LoginLayout>
  );
}


export default Login;
