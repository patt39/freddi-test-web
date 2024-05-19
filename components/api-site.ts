import { axiosApi } from "./axios";

export const getInstillaApi = async () => {
  const { data } = await axiosApi.get("/products/api");

  return data;
};

export const getProductsApi = async () => {
  const { data } = await axiosApi.get("/products");

  return data;
};

export const changeProductStatusApi = async (productId: string) => {
  const { data } = await axiosApi.put(`/products/${productId}/change-status`);

  return data;
};

export const getSelectedProductsApi = async () => {
  const { data } = await axiosApi.get("/select-products");

  return data;
};

export const createSelectedProductsApi = async (productId: string) => {
  const { data } = await axiosApi.post(`/select-products/${productId}/create`);

  return data;
};

export const deleteSelectedProductsApi = async (selectProductId: string) => {
  const { data } = await axiosApi.delete(
    `/select-products/${selectProductId}/delete`
  );

  return data;
};
