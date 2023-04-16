import { http } from "./http";

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

export function placeOrderMixpay(amount: string, redirectUrl: string): Promise<any> {
  return http.post(`/orders`, {
    data: {
      channel: "mixpay",
      amount: amount,
      redirect_url: redirectUrl,
    },
  });
}

export function placeOrderLemon(variantId: any, redirectUrl: string): Promise<any> {
  return http.post(`/orders`, {
    data: {
      channel: "lemon",
      variant_id: variantId,
      redirect_url: redirectUrl,
    },
  });
}

export function getOrderVariants(): Promise<any> {
  return http.get(`/orders/variants`, {});
}

export function addApp(name: string): Promise<Botastic.App> {
  return http.post(`/apps`, { data: {
      name,
    }
  });
}

export function updateApp(appId: string, name: string): Promise<Botastic.App> {
  return http.put(`/apps/${appId}`, { data: {
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

export function deleteBot(id: number): Promise<Botastic.Bot> {
  return http.delete(`/bots/${id}`);
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
      model: "openai:gpt-3.5-turbo",
      temperature: 1,
      max_turn_count: 4,
      context_turn_count: 4,
      middlewares: { items: [] },
    }
  });
}

export function testBotInput(
  appId: string, appSecret: string,
  botId: number, input: string
  ): Promise<any> {
  return http.post(`/conversations/oneway`, {
    data: {
      "bot_id": botId,
      "user_identity": "1",
      "lang": "en",
      "content": input,
    },
    headers: {
      "X-BOTASTIC-APPID": appId,
      "X-BOTASTIC-SECRET": appSecret,
    }
  });
}

