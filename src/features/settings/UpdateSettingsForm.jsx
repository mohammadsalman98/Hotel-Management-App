import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
  const { setting:
    { minBookingLength,
      breakfastPrice,
      maxGuestsPerBooking,
      maxBookingLength } = {}, isLoading } = useSettings();
  const { isUpdating, updatesettings } = useUpdateSettings();

  function hundleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updatesettings({ [field]: value });
  }
  if (isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating}
          defaultValue={minBookingLength} onBlur={(e) => hundleUpdate(e, 'minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' disabled={isUpdating}
          defaultValue={maxBookingLength} onBlur={(e) => hundleUpdate(e, 'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' disabled={isUpdating}
          defaultValue={maxGuestsPerBooking} onBlur={(e) => hundleUpdate(e, 'maxGuestsPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' disabled={isUpdating}
          defaultValue={breakfastPrice} onBlur={(e) => hundleUpdate(e, 'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
