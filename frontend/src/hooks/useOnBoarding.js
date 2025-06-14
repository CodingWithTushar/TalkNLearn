import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OnBoarding } from "../utils/apiCalls";

const useOnBoarding = () => {
  const queryClient = useQueryClient();
  const {
    mutate: OnBoardingFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: OnBoarding,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { OnBoardingFn, isPending, error };
};

export default useOnBoarding;
