import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export default function useCheckin() {
  const querClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(
        `the booking with id ${data.id} is checked in successfully`
      );
      querClient.invalidateQueries({ active: true });
      // invalidate all active queries
      // or we can use  queryKey: ["cabins"],
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error while checking in");
      //   console.log(err.message);
    },
  });
  return { checkIn, isCheckingIn };
}
