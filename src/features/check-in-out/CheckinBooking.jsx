import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'

import { useMoveBack } from "../../hooks/useMoveBack";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import useBooking from "../bookings/useBooking";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreackfast, setAddBreackfast] = useState(false);
  const { setting, isLoading: isLoadingSetting } = useSettings();
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking])
  const { checkIn, isCheckingIn } = useCheckin();
  if (isLoading || isLoadingSetting) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreackfast = setting.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreackfast) {
      checkIn({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfast,
          totalPrice: totalPrice + optionalBreackfast
        }
      });
    } else {
      checkIn({
        bookingId, breakfast: {}
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && <Box>
        <Checkbox
          onChange={() => {
            setAddBreackfast((add) => !add);
            setConfirmPaid(false);
          }
          }
          checked={addBreackfast}
          id='breakfast'
          disabled={addBreackfast}
        >
          I confirm that {guests.fullName} have  breakfast meals with total price {" "}
          {formatCurrency(optionalBreackfast)}
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          checked={confirmPaid}
          id='confirm'
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid his Financial dues with total amount {" "}
          {!addBreackfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreackfast)}
          (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreackfast)})
          ` }
        </Checkbox>
      </Box>
      <ButtonGroup>

        <Button onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >Check in</Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
