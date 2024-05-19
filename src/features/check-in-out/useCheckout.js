import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export default function useCheckout() {
  const querClient = useQueryClient();

  const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(
        `the booking with id ${data.id} is checked out successfully`
      );
      querClient.invalidateQueries({ active: true });
      // invalidate all active queries
      // or we can use  queryKey: ["cabins"],
    },
    onError: () => {
      toast.error("There was an error while checking out");
      //   console.log(err.message);
    },
  });
  return { checkOut, isCheckingOut };
}
