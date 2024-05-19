import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../services/apiAuth";

export default function useGetuser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getSession,
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
