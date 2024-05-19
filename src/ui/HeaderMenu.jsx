import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import Logout from '../features/authentication/Logout'
import ButtonIcon from "./ButtonIcon"
import DarkmodeToggle from "./DarkmodeToggle"

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 2.4rem;
`
export default function HeaderMenu() {
    const navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <Logout />
            </li>
            <li>
                <DarkmodeToggle />
            </li>

        </StyledHeaderMenu>
    )
}
