import { DingTalk } from "@App/msg-push/dingtalk";
import { MsgCenter } from "@App/msg-push/platform";
import { Wechat } from "@App/msg-push/wechat";
import gm from "@App/utils/gm";

console.log(gm);

let dingtalk = new DingTalk("", "");
let wechat = new Wechat("");

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

describe("MsgCenter", () => {

    let center = new MsgCenter([dingtalk, wechat]);
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
});
