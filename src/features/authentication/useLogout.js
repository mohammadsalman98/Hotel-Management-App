import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../services/apiAuth";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isLogingout, mutate: logout } = useMutation({
    mutationFn: LogoutUser,
    onSuccess: () => {
      //to clear all queries in app
      queryClient.removeQueries();
      navigate("login", { replace: true });
    },
  });
  return { isLogingout, logout };
}
