import { ajax } from "@App/gm/ajax";
import gmUt from "@App/utils/gm-unit-test";

console.log(gmUt);

describe("utils", () => {
	it("ajax", async () => {
		let resp = await ajax("https://www.baidu.com");
		console.log(resp);
		resp = await ajax.get("https://www.baidu.com");
		console.log(resp);
		resp = await ajax.post("https://www.baidu.com", { "ok": 1 });
		console.log(resp);
		resp = await ajax.post("https://www.baidu.com", "ok=1");
		console.log(resp);
	});

	it("instance", async () => {
		let instance = ajax.create({
			baseUrl: "https://bbs.tampermonkey.net.cn/"
		});
		let resp = await instance.get("forum.php?mod=forumdisplay&fid=2");
		console.log(resp);
	});

	it("validateStatus", async () => {
		let instance = ajax.create({
			baseUrl: "https://bbs.tampermonkey.net.cn/",
			validateStatus: (status: number) => {
				return status === 404;
			}
		});
		try {
			await instance.get("forum.php?mod=forumdisplay&fid=2");
		} catch (e: any) {
			console.log(e.config, e.response, e.message);
		}
		let resp = await instance.get("123131");
		console.log(resp);
	});

});
