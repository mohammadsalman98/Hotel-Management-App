import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as apiLogin } from "../../services/apiAuth";

export default function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogingIN } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: (userInfo) => {
      navigate("/");
      //   console.log(userInfo);
    },
    onError: (error) => {
      console.log("there is an error :", error);
      toast.error("provided email or passoward are incorrect ");
    },
  });
  return { login, isLogingIN };
}
