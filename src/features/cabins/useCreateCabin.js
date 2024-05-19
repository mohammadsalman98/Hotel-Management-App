import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createNewCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //   reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createNewCabin };
}
