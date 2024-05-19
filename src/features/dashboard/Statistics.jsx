import Statistic from "./Statistic";
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
export default function Statistics({ bookings, confirmedStays, numDays, cabinCount }) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const checkins = confirmedStays.length;
    // occupation equals num checked (in nights) / all available nights
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);
    return (
        <>
            <Statistic
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Statistic
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Statistic
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Statistic
                title="Occupancy rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + "%"}
            />


        </>
    )
}
