import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useForm, Controller } from "react-hook-form";
import useCreatBooking from "./useCreatBooking";

const DualFormRow = styled.div`
  display:grid;
  grid-template-columns:10rem 15rem 10rem 15rem ;
  grid-template-rows: 1;
  gap: 4rem;

`

function CreateBookingForm({ onCloseModal }) {

  const { isCreating, creatNewBooking } = useCreatBooking();


  const { register, handleSubmit, getValues, control, formState, reset } = useForm();
  const { errors } = formState;
  function onSubmit(data) {
    creatNewBooking({ ...data }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      }
    });
  }

  return (
    <>
      <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit)}>

        <FormRow >
          <DualFormRow>
            <label htmlFor="startDate"> Start Date</label>
            <Input type="date" id='startDate' disabled={isCreating} {...register('startDate', {
              required: "this field is required",
            })} />
            <label htmlFor="endDate"> End Date</label>
            <Input type="date" id='endDate' disabled={isCreating} {...register('endDate', {
              required: "this field is required",
            })} />
          </DualFormRow>
        </FormRow>

        <FormRow label="Number of nights" error={errors?.numNights?.message}>
          <Input type="number" id="numNights" disabled={isCreating} {...register('numNights', {
            required: "this field is required",
          })} />
        </FormRow>

        <FormRow label="Number of guests" error={errors?.numGuests?.message}>
          <Input type="number" id="numGuests" disabled={isCreating} {...register('numGuests', {
            required: "this field is required",
          })} />
        </FormRow>
        <FormRow label="Room price" error={errors?.cabinPrice?.message}>
          <Input type="number" id="cabinPrice" disabled={isCreating}{...register('cabinPrice', {
            required: "this field is required",
          })} />
        </FormRow>

        <FormRow label="Extras price" error={errors?.extrasPrice?.message}>
          <Input type="number" id="extrasPrice" disabled={isCreating} {...register('extrasPrice', {
            required: "this field is required",
          })} />
        </FormRow>
        <FormRow>
          <DualFormRow>
            <label htmlFor="totalPrice" >Total Price</label>
            <Input type="number" id="totalPrice" disabled={isCreating}{...register('totalPrice', {
              required: "this field is required",
            })} />
            <label>Status</label>
            <Controller
              name="Status"
              control={control}
              defaultValue="unconfirmed" // Set the default value
              render={({ field }) => (
                <select {...field} style={{ borderColor: 'var(--color-grey-300)', backgroundColor: 'var(--color-grey-0)' }}>
                  <option value="unconfirmed">Unconfirmed</option>
                  <option value="checked-out">Checked out</option>
                  <option value="checked-in">Checked in</option>

                </select>
              )}
              {...register('status')} />
          </DualFormRow>
        </FormRow>
        <FormRow >
          <DualFormRow>
            <label htmlFor="hasBreakfast" error={errors?.numNights?.message}>has Breakfast</label>
            <input type="checkbox" id="hasBreakfast" disabled={isCreating} {...register('hasBreakfast')} />
            <label htmlFor="isPaid" error={errors?.isPaid?.message}>is Paid</label>
            <input type="checkbox" id="isPaid" disabled={isCreating} {...register('isPaid')} />
          </DualFormRow>
        </FormRow>

        <FormRow label="Room id" error={errors?.cabinId?.message}>
          <Input type="number" id="cabinId" disabled={isCreating} {...register('cabinId', {
            required: "this field is required",
          })} />
        </FormRow>
        <FormRow label="Guest id" error={errors?.guestId?.message}>
          <Input type="number" id="guestId" disabled={isCreating}{...register('guestId', {
            required: "this field is required",
          })} />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute!  */}
          <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()} >
            Cancle </Button>
          <Button disabled={isCreating}>Add booking</Button>
        </FormRow>
      </Form>
      {/* <DevTool control={control} /> */}
    </>
  );
}

export default CreateBookingForm;


