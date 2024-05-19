import styled from "styled-components";
import { UseDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = UseDarkMode();
  const src = isDarkMode ? "/src/data/img/logo-dark.png" : '/src/data/img/logo-light.png';
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
