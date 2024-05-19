import { styled } from "styled-components";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCapin from "../features/cabins/AddCapin";
import CraetCabinOption from "../features/cabins/CraetCabinOption";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Rooms</Heading>
        <CraetCabinOption />
      </Row>
      <Row>
        <CabinTable />
        <AddCapin />
      </Row>
    </>
  );
}

export default Cabins;
