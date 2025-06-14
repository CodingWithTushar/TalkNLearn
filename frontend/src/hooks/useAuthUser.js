import { useQuery } from "@tanstack/react-query";
import { AuthUser } from "../utils/apiCalls";

export const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: AuthUser,
    retry: false,
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};
