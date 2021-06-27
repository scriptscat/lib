import gmUt from "@App/utils/gm-ut";
import {imageUrlToBase64} from "@App/utils/utils";

console.log(gmUt);

describe("utils", () => {
    it("imageUrlToBase64", async () => {
        let ok = await imageUrlToBase64("https://www.baidu.com/img/flexible/logo/pc/peak-result.png");
        console.log(ok);
    });
});
