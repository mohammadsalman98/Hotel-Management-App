import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export default function useCreatBooking() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: creatNewBooking } = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      toast.success("New booking created successfully ");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isCreating, creatNewBooking };
}
