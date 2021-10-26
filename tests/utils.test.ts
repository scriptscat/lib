import gmUt from "@App/utils/gm-unit-test";
import { imageUrlToBase64 } from "@App/utils/utils";

console.log(gmUt);

describe("utils", () => {
    it("imageUrlToBase64", async () => {
        let ok = await imageUrlToBase64("https://www.baidu.com/img/flexible/logo/pc/peak-result.png");
        console.log(ok);
    });

    it("test-axios", async () => {
        GM_xmlhttpRequest({ url: "https://www.baidu.com" });
        GM_xmlhttpRequest({ url: "https://www.baidu.com", method: "POST", data: { ok: 1 } });
    });
});
