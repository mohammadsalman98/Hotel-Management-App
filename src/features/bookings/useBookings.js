import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "eq",
        };
  //SortBy
  const sortByValue = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByValue.split("-");
  // const directionFactor = direction === "asc" ? 1 : -1;
  const sortBy = {
    field,
    direction,
  };
  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    data: { data: bookings, count } = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  //Prefetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, isError, count };
}
