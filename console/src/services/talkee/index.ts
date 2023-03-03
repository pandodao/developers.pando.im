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

export function addSite(name: string, origin: string): Promise<Talkee.Site> {
  return http.post(`/sites`, { data: {
      name,
      origin,
      use_arweave: true,
    }
  });
}

export function editSite(id: number, name: string, origin: string): Promise<Talkee.Site> {
  return http.put(`/sites/${id}`, { data: {
      name,
      origin,
      use_arweave: true,
    }
  });
}

export function getSites(): Promise<Talkee.Site[]> {
  return http.get("/sites");
}
