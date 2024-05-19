import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  /* we can put it here like that or after checking isLoading 
   const { status, id: bookingId } = booking || {};
  */

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />
  const { status, id: bookingId } = booking
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Modal>
        <ButtonGroup>

          {status === 'checked-in' &&
            <Button
              variation="secondary"
              disabled={isCheckingOut}
              onClick={() => checkOut(bookingId)} >
              checking out
            </Button>}
          <Modal.Open opens='delete-booking'>
            <Button variation="danger">  Delete booking  </Button>

          </Modal.Open>
          <Modal.Window name='delete-booking'>
            <ConfirmDelete
              disabled={isDeleting}
              resourceName={'booking'}
              onConfirm={() => { deleteBooking(bookingId, { onSettled: () => navigate(-1), }) }
              } />
          </Modal.Window>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
