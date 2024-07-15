import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";


function CreateCabinForm({ capinToedit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = capinToedit;
  const IsEditSeassion = Boolean(editId);
  const { isCreating, createNewCabin } = useCreateCabin();
  const { isEditing, editCurrentCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;
  const { register, handleSubmit, getValues, control, formState, reset } = useForm({
    defaultValues: IsEditSeassion ? { ...editValues } : {}
    , mode: "onChange"
  })
  const { errors } = formState;
  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data?.image[0];
    if (IsEditSeassion) {
      editCurrentCabin({ newCabin: { ...data, image }, id: editId }, {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      }
      );
    } else
      createNewCabin({ ...data, image }, {
        onSuccess: () => {
          reset();
          onCloseModal?.()
        }
      });
  }
  function onError(errors) {
    console.error(errors);
  }
  return (
    <>
      <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Room name" error={errors?.name?.message}>
          <Input type="text" id="name" disabled={isWorking}
            {...register('name', {
              required: 'this field is required '
            })} />
        </FormRow>

        <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
          <Input type="number" id="maxCapacity" disabled={isWorking}
            {...register('maxCapacity', {
              required: 'this field is required ',
              min: {
                value: 1,
                message: 'capacity should be at least 1 '
              }
            })} />
        </FormRow>

        <FormRow label="Regular price" error={errors?.regularPrice?.message}>
          <Input type="number" id="regularPrice"
            disabled={isWorking}
            {...register('regularPrice', {
              required: "this field is required ",
              min: {
                value: 1,
                message: 'price should be at least 1 '
              }
            })} />
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
          <Input type="number" id="discount" defaultValue={0} {...register('discount', {
            required: "this field is required ",
            validate: (value) => value < getValues().regularPrice ||
              ' Discount should be less than the regular price '
          })} />
        </FormRow>

        <FormRow label="Description for website"

          error={errors?.description?.message}>
          <Textarea type="number" id="description"
            defaultValue=""
            disabled={isWorking}
            {...register('description')} />
        </FormRow>

        <FormRow label="Room photo">
          {/* <Label htmlFor="image">Cabin photo</Label> */}
          <FileInput id="image" accept="image/*"
            {...register('image', {
              required: IsEditSeassion ? false : 'this field is required ',
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
            Cancle </Button>
          <Button disabled={isWorking}>{IsEditSeassion ? 'Edit room' : 'Add room'}</Button>
        </FormRow>

      </Form>
      {/* <DevTool control={control} /> */}
    </>
  );
}

export default CreateCabinForm;
