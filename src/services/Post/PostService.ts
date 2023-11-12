import { UseQueryResult, useQuery } from "react-query";
import { PostServiceApi } from "./api";
import { DetailArticleDisplayResponse } from "Response";

export const useFetchDetailData = <T>(
  params: T,
  content: string
): UseQueryResult<DetailArticleDisplayResponse> => {
  return useQuery(
    ["detail", params],
    async () => {
      const res = await PostServiceApi.getDetailPost<
        DetailArticleDisplayResponse,
        T
      >(params);

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
