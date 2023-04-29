import { Cookie, CookieJar } from "tough-cookie";
import { imageUrlToBase64, postJson } from "../utils";

(<any>window).postJson = postJson;
(<any>window).imageUrlToBase64 = imageUrlToBase64;
(<any>window).tough = {
  Cookie: Cookie,
  CookieJar: CookieJar,
};
