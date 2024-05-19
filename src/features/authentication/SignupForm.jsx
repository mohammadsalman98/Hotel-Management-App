import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";


function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;
  const { isCreating, signUp } = useSignup();
  function onSubmitForm({ fullName, password, email }) {
    signUp({ fullName, password, email }, {
      onSettled: () => {
        reset();
      }
    });

  }
  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow label="Full name" error={errors?.fullName?.message} >
        <Input type="text" id="fullName" disabled={isCreating} {...register('fullName', {
          required: "this field is required",
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={isCreating} {...register('email', {
          required: "this field is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "please provide a vaild Email address"
          },
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.Password?.message}>
        <Input type="password" id="password" disabled={isCreating}  {...register('password', {
          required: "this field is required",
          minLength: {
            value: 8,
            message: ' password should be more than 8 characters '
          },

        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isCreating} {...register('passwordConfirm', {
          required: "this field is required",
          validate: (confirmPass) => confirmPass === getValues()?.password || "inserted passwords aren't mutched"
          ,
        },
        )} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isCreating} type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
// Email regex: /\S+@\S+\.\S+/
