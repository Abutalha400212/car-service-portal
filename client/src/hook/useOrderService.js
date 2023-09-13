import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useOrderService = (id) => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axiosInstance
      .get(`/order/${id}`)
      .then((data) => {
        setLoading(true);
        setOrder(data.data.order);
      })
      .finally(() => {
        setLoading(false);
      });
  });
  return [order, loading];
};
