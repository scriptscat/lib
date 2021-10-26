import {DingTalk} from "@App/msg-push/dingtalk";
import {MsgCenter} from "@App/msg-push/platform";
import {Wechat} from "@App/msg-push/wechat";
import gmUt from "@App/utils/gm-unit-test";
import {Telegram} from "@App/msg-push/telegram";

console.log(gmUt)
let dingtalk = new DingTalk("", "");
let wechat = new Wechat("");
let telegram = new Telegram("", "");

describe("DingTalk", () => {
    it("text", async () => {
        let result = await dingtalk.pushMsg({
            type: "text",
            content: "test"
        });
        expect(result.error()).toEqual("");
        expect(result.code()).toEqual(0);
    })
    it("markdown", async () => {
        let param: any = {};
        param[dingtalk.platform()] = {
            markdown: {
                title: "md标题",
                text: "# h1\n# h2\n> description",
            }
        };
        let result = await dingtalk.pushMsg({
            type: "markdown",
            param: param,
        });
        expect(result.error()).toEqual("");
        expect(result.code()).toEqual(0);
    })
});


describe("telegram", () => {
    it("text", async () => {
        let result = await telegram.pushMsg({
            type: "text",
            content: "test"
        });
        expect(result.error()).toEqual("");
        expect(result.code()).toEqual(0);
    })
    it("markdown", async () => {
        let param: any = {};
        param[telegram.platform()] = {
            markdown: "# h1\n# h2\n> description",
        };
        let result = await telegram.pushMsg({
            type: "markdown",
            param: param,
        });
        expect(result.error()).toEqual("");
        expect(result.code()).toEqual(0);
    })
})


describe("MsgCenter", () => {
    let center = new MsgCenter([dingtalk, wechat, telegram]);
    it("send", async () => {
        let results = await center.pushMsg({
            type: "text",
            content: "test"
        });
        for (const key in results) {
            let result = results[key];
            expect(result.error()).toEqual("");
            expect(result.code()).toEqual(0);
        }
    });
    it("multiple", async () => {
        let results = await center.pushMsg({
            type: "text",
            content: "test",
            param: {
                wechat: {
                    type: "markdown",
                    content: "# h1"
                }
            }
        });
        for (const key in results) {
            let result = results[key];
            expect(result.error()).toEqual("");
            expect(result.code()).toEqual(0);
        }
    });
    it('zero', async () => {
        let center = new MsgCenter([]);
        let ret = await center.pushMsg({})
        console.log("ok",ret)
    });
});
