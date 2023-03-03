import { v4 as uuid } from "uuid";

import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export function attachRequestId(config: AxiosRequestConfig) {
  config.headers["x-request-id"] = uuid();

  return config;
}

export function checkRequsestId(resp: AxiosResponse) {
  const reqId = resp?.headers?.["x-request-id"];
  const respId = resp?.config?.headers?.["x-request-id"];

  if (reqId && respId && reqId !== respId) {
    return Promise.reject(new Error(`[X-Request-Id Not Match] request: ${reqId}; response: ${respId}`));
  }

  return resp;
}

export const createAuthIntercept = (logout: () => void, pick: (resp: AxiosResponse) => any) => {
  return (resp: AxiosResponse) => {
    if (resp?.data?.error?.code === 401 || resp?.data?.error?.code === 403) {
      console.log(logout);
      logout();
      return Promise.reject(resp.data.error);
    }

    return pick(resp);
  };
};

export const creatErrorIntercept = (logout: () => void) => {
  return (error: AxiosError) => {
    if (!error.response) {
      return Promise.reject({ code: -1, message: "No Network Response" });
    }
    if (error.response.status === 401) {
      logout();
    }

    const { code, msg } = error.response.data;
    return Promise.reject({ code, message: msg });
  };
};
