import { http } from "./http";
import { v4 as uuid } from "uuid";

export function getMe(): Promise<any> {
  return http.get("/me");
}

export function getAssets(): Promise<Mixin.Asset[]> {
  return http.get(`/assets`);
}

export function getAsset(assetId: string): Promise<Mixin.Asset> {
  return http.get(`/assets/${assetId}`);
}

export function getUser(userId: string): Promise<Mixin.User> {
  return http.get(`/users/${userId}`);
}

export function getUsers(userIds: Array<string>): Promise<Mixin.User[]> {
  return http.post("/users/fetch", {
    data: userIds,
  });
}

export function getUTXOs(membersHash: string, threshold: number, offset: string, limit:number): Promise<Mixin.UTXO[]> {
  return http.get(`/multisigs/outputs?members=${membersHash}&threshold=${threshold}&offset=${offset}&limit=${limit}&order=created`);
}

export function checkCode(code: string): Promise<any> {
  return http.get("/codes/" + code, {});
}

export function getPayments(asset_id:string, amount:string, memo:string, receivers:string[], threshold:number, trace_id: string = ""): Promise<any> {
  if (trace_id === "") {
    trace_id = uuid();
  }
  const params = {
    asset_id,
    amount,
    memo,
    trace_id,
    opponent_multisig: { receivers, threshold },
  };
  return http.post("/payments", { data: params });
}

export function createMultisig(raw: string, action: string): Promise<Mixin.MultisigTx> {
  return http.post("/multisigs", { data: { raw: raw, action: action } });
}

export function loadGhostKeys(receivers: string[], index: number): Promise<any> {
  // return { mask, keys }
  return http.post("/outputs", { data: { receivers, index } });
}

export function postSignature(data: Mixin.ExternSignaturePayload): Promise<any> {
  return http.post("/external/proxy", { data });
}

export function getConversation(id: string): Promise<any> {
  return http.get("/conversations/" + id);
}



