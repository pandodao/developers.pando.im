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

export function getBots(): Promise<Botastic.Bot[]> {
  return http.get("/bots");
}

export function getPublicBots(): Promise<Botastic.Bot[]> {
  return http.get(`/bots/public`);
}

export function getBot(id: number): Promise<Botastic.Bot> {
  return http.get(`/bots/${id}`);
}

export function updateBot(id: number, name: string, model: string, prompt: string,
  temperature: number, maxTurnCount: number, contextTurnCount: number, middlewares: Object): Promise<Botastic.Bot> {
  return http.put(`/bots/${id}`, {
    data: {
      name, prompt,
      model,
      temperature,
      max_turn_count: maxTurnCount,
      context_turn_count: contextTurnCount,
      middlewares,
    }
  });
}

export function addBot(name: string, prompt: string): Promise<Botastic.Bot> {
  return http.post(`/bots`, {
    data: {
      name, prompt,
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_turn_count: 4,
      context_turn_count: 4,
      middlewares: { items: [] },
    }
  });
}

