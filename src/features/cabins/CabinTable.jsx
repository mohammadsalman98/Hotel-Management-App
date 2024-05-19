import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCapin from "./useCapin";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";


export default function CabinTable() {
  const { cabins, isLoading } = useCapin();
  const [searchParams] = useSearchParams();
  // 1- Filter implementation
  const filtereValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filtereValue === "all") filteredCabins = cabins;
  if (filtereValue === "with-discount") filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  if (filtereValue === "no-discount") filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // 2- SortBy implementation
  const sortByValue = searchParams.get('sortBy') || 'name-asc';
  const [field, sortDirection] = sortByValue.split('-');
  const directionFactor = sortDirection === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]) * directionFactor;
    } else {
      return (a[field] - b[field]) * directionFactor;
    }
  });

  if (isLoading) return <Spinner />

  if (!cabins.length) return <Empty resource='cabins' />


  return (
    <>
      {/* to track menus in all rows ?? not handled !!!*/}
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header as='header'>
          <div></div>
          <div>Rooms</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* perform render props pattern */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) =>
            <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </>
  )
}
