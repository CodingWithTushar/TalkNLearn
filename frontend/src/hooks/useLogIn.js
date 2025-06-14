import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogIn } from "../utils/apiCalls";

const useLogIn = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: LogIn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, LogInFn: mutate };
};

export default useLogIn;
