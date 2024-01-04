import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { ApiLocalService } from "./ApiLocalService";
import {
  ArticleListResponse,
  DetailArticleDisplayResponse,
  ResponseConfig,
} from "Response";
import { message } from "antd";

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
      const response = await fetch(ApiLocalService.localPost, {
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
export const useLocalPostUpdate = <T, U>(): UseMutationResult<
  U,
  unknown,
  T
> => {
  const mutation = useMutation<U, unknown, T>({
    mutationKey: ["localPostUpdate"],
    mutationFn: async (params: T) => {
      const response = await fetch(ApiLocalService.localPost, {
        cache: "no-cache",
        method: "PUT",
        mode: "same-origin",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response?.json();

      return result?.data as U;
    },
    retryDelay: 1000 * 60 * 60 * 24,
    retry: false,
    onSettled: (data, error, _variables, _context) => {
      if (error) {
        message.error("Error:" + JSON.stringify(error));
      }

      data && message.success("Success");
    },
  });

  const updateLocalPost = async (params: T): Promise<U> => {
    try {
      const result = await mutation.mutateAsync(params);

      return result;
    } catch (error) {
      console.error("Error updating local post:", error);
      message.error("Error:" + error?.message);

      throw new Error("Call api error");
    }
  };

  return {
    ...mutation,
    mutateAsync: updateLocalPost,
  };
};
