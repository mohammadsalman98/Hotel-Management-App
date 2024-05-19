import styled from "styled-components";
import Spinner from '../../ui/Spinner'
import useCapin from "../cabins/useCapin";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

import Statistics from "./Statistics";
import SalesChart from "./SalesChart";
import DurationChart from './DurationChart';
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto  auto 34rem;
  gap: 2.4rem;
`;


export default function DashboardLayout() {
  const { bookings, isLoading: isloading1 } = useRecentBookings();
  const { isLoading: isloading2, confirmedStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCapin();
  if (isloading1 || isloading2 || isLoading3) return <Spinner />
  // console.log(bookings);
  // console.log(stays);

  return (
    <StyledDashboardLayout>
      <Statistics bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length} />
      <SalesChart bookings={bookings} numDays={numDays} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />

    </StyledDashboardLayout>
  )
}
