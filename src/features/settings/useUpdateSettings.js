import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updatesettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success(" the setting is edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
  return { isUpdating, updatesettings };
}
