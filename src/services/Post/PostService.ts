import { UseQueryResult, useQuery } from "react-query";
import { PostServiceApi } from "./api";
import { PostDetailResponse } from "Api";

export const useFetchDetailData = <T>(
  params: T,
  content: string
): UseQueryResult<PostDetailResponse> => {
  return useQuery(
    ["detail", params],
    async () => {
      const res = await PostServiceApi.getDetailPost<PostDetailResponse, T>(
        params
      );

      return res;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 60 * 24,
      enabled: !content || !!params,
    }
  );
};
