import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "../utils/apiCalls.js";

const useLogOut = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: LogOut,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { isPending, error, LogOutFn: mutate };
};

export default useLogOut;
