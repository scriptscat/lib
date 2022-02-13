import { ajax } from "@App/gm/ajax";
import gmUt from "@App/utils/gm-unit-test";
import { Axios } from "axios";
import nock from 'nock';

console.log(gmUt);

const NETWORK_ERROR = new Error('Some connection error');
(<any>NETWORK_ERROR).code = 'ECONNRESET';

function setupResponses(client: Axios, responses: Array<any>) {
	const configureResponse = () => {
		const response = responses.shift();
		if (response) {
			response();
		}
	};
	client.interceptors.response.use(
		(result) => {
			configureResponse();
			return result;
		},
		(error) => {
			configureResponse();
			return Promise.reject(error);
		}
	);
	configureResponse();
}

describe("utils", () => {
	it("ajax", async () => {
		let resp = await ajax("https://www.baidu.com");
		console.log(resp);
		expect(resp.data).toMatch(/html/)
		resp = await ajax.get("https://www.baidu.com", { responseType: 'arraybuffer' });
		console.log(resp);
		expect(resp.data).toBeInstanceOf(Buffer);
		resp = await ajax.post("https://www.baidu.com", { "ok": 1 });
		console.log(resp);
		resp = await ajax.post("https://www.baidu.com", "ok=1");
		console.log(resp);
	});

	it("instance", async () => {
		let instance = ajax.create({
			baseURL: "https://bbs.tampermonkey.net.cn/"
		});
		let resp = await instance.get("forum.php?mod=forumdisplay&fid=2");
		console.log(resp);
	});

	it("validateStatus", async () => {
		let instance = ajax.create({
			baseURL: "https://bbs.tampermonkey.net.cn/",
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

	it('retry', (done) => {
		const client = ajax.create();
		setupResponses(client, [
			() => nock('http://example.com').get('/test').replyWithError(NETWORK_ERROR),
			() => nock('http://example.com').get('/test').reply(200, 'It worked!')
		]);

		const retryCondition = (error: any) => {
			expect(error).toBe(NETWORK_ERROR);
			done();
			return false;
		};

		ajax.ajaxRetry(client, { retries: 1, retryCondition });

		client.get('http://example.com/test').catch(() => { });
	});
});
