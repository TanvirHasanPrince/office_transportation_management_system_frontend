import { authKey } from "@/constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getFromLocalStorage(authKey);
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    const responseObject: IGenericErrorResponse = {
      success: error?.response?.data?.success,
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.messages || "Something went wrong",
      errorMessages: error?.response?.data?.messages,
    };
    

    return Promise.reject(error);
  }
);

export { instance };
