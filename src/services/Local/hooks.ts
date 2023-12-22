import { UseQueryResult, useQuery } from "react-query";
import { ApiLocalService } from "./ApiLocalService";
import { DetailArticleDisplayResponse, ResponseConfig } from "Response";

/**
 * 获取Local的文档详细数据
 * @param params
 * @param content
 * @returns
 */
export const useLocalFetchDetailData = <T>(
  params: T
): UseQueryResult<DetailArticleDisplayResponse> => {
  return useQuery({
    queryKey: ["detail", params],
    queryFn: async () => {
      console.log({
        ApiLocalService: ApiLocalService.localPostDetail,
      });
      const response = await fetch(ApiLocalService.localPostDetail, {
        cache: "no-cache",
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify(params),
      });

      const result: ResponseConfig<DetailArticleDisplayResponse>["data"] =
        await response?.json();

      return result?.data;
    },

    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!params,
  });
};
