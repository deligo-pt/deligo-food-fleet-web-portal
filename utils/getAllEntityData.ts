import { serverFetch } from "@/lib/serverFetch";
import { TMeta } from "@/types";
import { catchAsync } from "@/utils/catchAsync";

export const getAllEntityData = async <T>(
  endpoint: string,
  queryString?: string,
): Promise<{ data: T[]; meta?: TMeta }> => {
  const result = await catchAsync(async () => {
    return await serverFetch.get(
      `${endpoint}${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          revalidate: 30,
        },
      },
    );
  });

  if (result?.success)
    return {
      data: result.data,
      meta: result.meta,
    };

  return {
    data: [],
  };
};

export const getSingleEntityData = async <T>(endpoint: string): Promise<T> => {
  const result = await catchAsync(async () => {
    return await serverFetch.get(endpoint, {
      next: {
        revalidate: 30,
      },
    });
  });

  if (result?.success) return result.data as T;

  return {} as T;
};
