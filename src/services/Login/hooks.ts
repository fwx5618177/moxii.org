import { get } from "@/utils/post.method";
import { UseQueryResult, useQuery } from "react-query";
import { LoginServiceApi } from "./LoginServiceApi";

export const useLoginBgImage = <U>(): UseQueryResult<U> => {
  return useQuery({
    queryKey: ["loginBgImage"],
    queryFn: async () => {
      return await get<U>(LoginServiceApi.getLoginPageBgImage);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
