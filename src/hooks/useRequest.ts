import { useCallback, useState } from 'react';
import Axios from 'axios';
import ResponseError from '@/utils/ResponseError';
import { toast } from 'react-toastify';

const axios = Axios.create({
  timeout: 20000,
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

type Method = 'post' | 'get' | 'patch' | 'delete' | 'put';

type Request = {
  url: string;
  method: Method;
  headers?: any;
  body?: any;
};

type UseRequest = {
  makeRequest: (input: Request) => Promise<any>;
  loading: boolean;
};

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;

    config.headers.Accept = 'application/json';

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const useRequest = (): UseRequest => {
  const [loading, setLoading] = useState(false);

  const makeRequest = useCallback(
    async ({ url, method, body, headers = {} }: Request) => {
      setLoading(true);

      return axios[method](url, body, headers)
        .then(({ data }): any => {
          setLoading(false);

          return data;
        })
        .catch((err) => {
          setLoading(false);

          toast.error("Error ocurred while requesting");

          throw new ResponseError('Network Error', err.message);
        });
    },
    [setLoading]
  );

  return { makeRequest, loading };
};

export default useRequest;
