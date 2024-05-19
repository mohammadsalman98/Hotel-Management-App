import { styled } from 'styled-components';
import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from './HeaderMenu';
const StyledHeader = styled.header`
     padding: 1.2rem 4.8rem;
     border-bottom: 1px solid var(--color-grey-0);
     background-color: var(--color-grey-0);
     display: flex;
     justify-content: flex-end;
     gap:2rem;
`
function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    )
}

export default Header