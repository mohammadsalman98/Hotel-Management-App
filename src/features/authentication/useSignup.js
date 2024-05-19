import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";
export default function useSignup() {
  const { isPending: isCreating, mutate: signUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      toast.success(
        "Account successfully created  :) ,Plese verufy the new account from the user's email address "
      );
      console.log(user);
    },
    onError: (error) => {
      console.log(error);
      toast.error("error");
    },
  });

  return { isCreating, signUp };
}
