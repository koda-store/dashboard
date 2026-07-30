import {api} from "../api/axios";

export const getAdminOrders = async (page = 1, limit = 20) => {
  const res = await api.get(
    `/orders/admin?page=${page}&limit=${limit}&sortBy=createdAt&sortDir=desc`
  );
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`/orders/admin/${id}`);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await api.patch(`/orders/admin/${id}/status`, { status });
  return res.data;
};

