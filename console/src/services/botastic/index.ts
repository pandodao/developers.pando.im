import { http } from "./http";
import { v4 as uuid } from "uuid";

export function getMe(): Promise<any> {
  return http.get("/me");
}

export function login(mixinToken: string, msg: string, sig: string): Promise<any> {
  const data:any = {
    lang: "ja",
  };
  if (mixinToken === "") {
    data.method = "mvm";
    data.signed_message = msg;
    data.signature = sig;
  } else {
    data.method = "mixin_token";
    data.mixin_token = mixinToken;
  }
  return http.post(`/auth/login`, { data });
}

export function addApp(name: string): Promise<Botastic.App> {
  return http.post(`/apps`, { data: {
      name,
    }
  });
}

export function updateApp(id: number, name: string): Promise<Botastic.App> {
  return http.put(`/apps/${id}`, { data: {
      name,
    }
  });
}

export function deleteApp(id: number): Promise<Botastic.App> {
  return http.delete(`/apps/${id}`, {});
}

export function getApps(): Promise<Botastic.App[]> {
  return http.get("/apps");
}
