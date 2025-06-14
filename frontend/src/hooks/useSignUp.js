import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignUp } from "../utils/apiCalls";

const useSignUp = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: SignUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, SingUpFn: mutate };
};

export default useSignUp;
