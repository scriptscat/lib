/**
 * 优化GM函数
 */

import { ajax } from "./ajax";

let gm = {
	ajax: ajax,
};

(<any>window).gm = gm;
