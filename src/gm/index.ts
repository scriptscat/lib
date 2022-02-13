/**
 * 优化GM函数
 */

import { ajax } from "./ajax";
import { notification } from "./utils";

let gm = {
	ajax: ajax,
	notification: notification,
};

(<any>window).gm = gm;
