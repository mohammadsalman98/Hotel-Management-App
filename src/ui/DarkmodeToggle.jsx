import ButtonIcon from "./ButtonIcon";
import { HiOutlineSun } from "react-icons/hi2"
import { HiOutlineMoon } from "react-icons/hi2";
import { UseDarkMode } from "../context/DarkModeContext";

export default function DarkmodeToggle() {

    const { isDarkMode, toggleDarkMode } = UseDarkMode();

    return (
        <>
            <ButtonIcon onClick={toggleDarkMode}>
                {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
            </ButtonIcon>
        </>
    )
}
