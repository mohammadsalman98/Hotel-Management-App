import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import useLogout from "./useLogout"
export default function Logout() {
    const { logout, isLogingout } = useLogout();
    return (
        <>
            <ButtonIcon onClick={logout} disabled={isLogingout} >
                <HiArrowRightOnRectangle />
            </ButtonIcon>
        </>
    )
}
