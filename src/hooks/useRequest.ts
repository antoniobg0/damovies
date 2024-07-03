import { useCallback, useState } from 'react';
import Axios from 'axios';
import AppError from '@/utils/AppError';
import { TrophyIcon } from '@heroicons/react/24/outline';
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

      try {
        const { data } = await axios[method](url, body, headers);
        setLoading(false);

        return data;
      } catch (err: any) {
        setLoading(false);

        const error = new AppError(
          'Network Error',
          err.response.data.status_message,
          err.response.data.status_code
        );

        toast.error(error.toString());

        throw error;
      }
    },
    [setLoading]
  );

  return { makeRequest, loading };
};

export default useRequest;
