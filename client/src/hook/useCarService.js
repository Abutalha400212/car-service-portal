import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useCarService = (id) => {
  const [service, setService] = useState({});
  const [loading, setLoading] = useState(false);
  let url;
  if (id) {
    url = `/service/${id}`;
  } else {
    url = "/service";
  }
  useEffect(() => {
    axiosInstance
      .get(url)
      .then((data) => {
        setLoading(true);
        setService(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return [service, loading];
};
