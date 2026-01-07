/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFetch";


export const getDeliveryPartners = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(`/delivery-partners${queryString ? `?${queryString}` : ""}`);

    const result = await res.json();

    return result;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error?.response?.data?.message : 'Something went wrong in delivery partner fetching.'}`
    };
  }
};

export const getPartnerPerformanceAnalytics = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(`/analytics/partner-performance-analytics${queryString ? `?${queryString}` : ""}`);

    const result = await res.json();

    return result?.data;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error?.response?.data?.message : 'Something went wrong in partner performance fetching.'}`
    };
  }
};

export const getDeliveryPartnerDetails = async (id?: string) => {
  try {
    const res = await serverFetch.get(`/delivery-partners/${id}`);

    const result = await res.json();

    return result?.data;

  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error?.response?.data?.message : 'Something went wrong in delivery partner fetching.'}`
    };
  }
};

export const uploadPartnerDocuments = async (
  id: string,
  key: string,
  file: Blob
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ docImageTitle: key }));

    const res = await serverFetch.patch(
      `/delivery-partners/${id}/docImage`,
      {
        body: formData,
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    console.error("Server fetch error:", error);
    return { success: false, message: error?.response?.data?.message };
  }
};
