import { imageUrlToBase64, postJson } from "../utils";

(<any>window).postJson = postJson;
(<any>window).imageUrlToBase64 = imageUrlToBase64;
