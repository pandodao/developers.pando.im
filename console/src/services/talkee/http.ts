import { Http } from "@foxone/utils";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { attachRequestId, checkRequsestId } from "../interceptors";

function requestInterceptors() {
  return [
    (config: AxiosRequestConfig) => {
      // attachRequestId(config);

      return config;
    },
  ];
}

function responseInterceptors() {
  return [
    (resp: AxiosResponse) => {
      // checkRequsestId(resp);
      return resp;
    },
  ];
}

export const http = new Http({}, [requestInterceptors()], [responseInterceptors()]);
