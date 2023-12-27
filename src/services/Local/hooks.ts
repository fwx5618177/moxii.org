import { UseQueryResult, useQuery } from "react-query";
import { ApiLocalService } from "./ApiLocalService";
import {
  ArticleListResponse,
  DetailArticleDisplayResponse,
  ResponseConfig,
} from "Response";

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

/**
 * 获取本地的文章数据
 */
export const useLocalPostList = (): UseQueryResult<ArticleListResponse> => {
  return useQuery({
    queryKey: ["localPostList"],
    queryFn: async () => {
      const response = await fetch(ApiLocalService.localPostList, {
        cache: "no-cache",
        method: "GET",
        mode: "same-origin",
      });

      const result = await response?.json();

      return result?.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

/**
 * 修改本地的文章数据
 */
export const useLocalPostUpdate = async () => {};
