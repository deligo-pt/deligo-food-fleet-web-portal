export const catchAsync = async (
  fn: () => Promise<Response>,
  customSuccessMsg?: string,
  customErrMsg?: string,
) => {
  try {
    const res = await fn();
    const result = await res.json();

    if (result.success) {
      return {
        success: true,
        data: result.data,
        message: result.message || customSuccessMsg,
        meta: result.meta,
      };
    }

    return { success: false, data: result.error, message: result.message };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      data: error?.response?.data || null,
      message: error?.response?.data?.message || customErrMsg,
    };
  }
};
