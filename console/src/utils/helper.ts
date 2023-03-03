import { Ref } from "vue";
import { Base64 } from "@foxone/utils";
import multiavatar from "@multiavatar/multiavatar";
import { SHA3 } from "sha3";
import { validate as isValidUUID } from 'uuid';

export const ASSET_UPDATE_TIMEOUT = 300000;

export function shortStr(str: string) {
  return str.slice(0, 5) + "..." + str.slice(-4);
}

export function genAvatar(str: string) {
  return "data:image/svg+xml;base64," + Base64.encode(multiavatar(str));
}

export type MaybeRef<T> = T | Ref<T>;

export function fmtCurrency(input: any, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(input);
}

export function fmtAmount(input: any) {
  if (input) {
    const parts = input.split(".");
    if (parts.length > 1) {
      parts[1] = parts[1].replace(/0+$/, "");
      return parts[1] ? `${parts[0]}.${parts[1]}` : parts[0];
    }
    return input;
  }
  return "0.00";
}

export function toHex(s: string) {
  // convert string to hex
  // let r = "";
  // let c = 0;
  // while (c < s.length) {
  //   let h = s.charCodeAt(c++).toString(16);
  //   while (h.length < 2) {
  //     h = "0" + h;
  //   }
  //   r += h;
  // }
  // return r;
  const arr = new TextEncoder().encode(s);
  return Array.from(
    arr,
    byte => byte.toString(16).padStart(2, "0")
  ).join("");
}

export function hexToString(hex: string) {
  // convert hex to utf8
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i !== bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return new TextDecoder().decode(bytes);
}

export function sha3_256(input: string, output = "hex") {
  const hash = new SHA3(256);
  hash.update(input);
  return hash.digest(output as any);
}

export function shadeColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.floor((R * (100 + percent)) / 100);
  G = Math.floor((G * (100 + percent)) / 100);
  B = Math.floor((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

export function validateUUID(id: string) {
  if (!isValidUUID(id)) {
    return false;
  }
  return true;
}

export function decodeSignedTx(signedTx: string) {
  let tx = null;
  try {
    const result = (window as any).mixinGo.decodeTransaction(signedTx);
    tx = JSON.parse(result);
  } catch (e) {
    console.log("failed to decode signed_tx, ignore", signedTx);
    return null;
  }
  return tx;
}

export function shareCard(title: string, description: string, icon_url: string, url: string) {
  const env = useRuntimeConfig();

  const data = {
    action: url,
    app_id: env.public.clientID,
    description,
    icon_url,
    title,
  };

  window.location.href =
    "mixin://send?category=app_card&data=" +
    encodeURIComponent(Base64.encode(JSON.stringify(data)));
}
