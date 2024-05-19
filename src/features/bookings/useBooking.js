import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useBooking() {
  const { bookingId } = useParams();
  const {
    data: booking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    // we can get this id from the bookingDetails row or from use params
    retry: false,
    // avoiding retry request if there is any  probleme in the source
  });
  return { booking, isLoading, isError };
}
