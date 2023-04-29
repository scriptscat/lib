## 工具类
> https://github.com/scriptscat/lib/tree/main/src/utils

请在脚本中加入如下 3 行

```ts
// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.3/dist/utils.js
// @definition https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.3/src/types/utils.d.ts
```

## cookiejar

```js
// ==UserScript==
// @name         New Userscript
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        https://bbs.tampermonkey.net.cn/
// @require      https://scriptcat.org/lib/993/1.0.1/%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7%E5%8C%85.js
// @grant        GM_xmlhttpRequest
// @connect      bbs.tampermonkey.net.cn
// ==/UserScript==

function extractCookies(cookieStr) {
    // 移除 "set-cookie: "前缀
    const withoutPrefix = cookieStr.replace(/^set-cookie:\s*/, '');
    // 使用正则表达式，根据逗号分割字符串，但要排除在expires内的逗号
    const splitCookies = withoutPrefix.split(/,\s*(?=\w[^;]*=)/);
    return splitCookies;
}

const cookieJar = new tough.CookieJar();

GM_xmlhttpRequest({
    url: "https://bbs.tampermonkey.net.cn/",
    onload(resp) {
        // 提取响应头中的 Set-Cookie 字段
        const cookieStrs = extractCookies(resp.responseHeaders.match(/set-cookie: (.+);/)[1]);
        console.log(resp, cookieStrs);
        cookieStrs.forEach((val) => {
            cookieJar.setCookie(tough.Cookie.parse(val), "https://bbs.tampermonkey.net.cn/");
        });
        setTimeout(() => {
            cookieJar.getCookies("https://bbs.tampermonkey.net.cn/", function (err, cookies) {
                console.log(err, cookies);
            });
        }, 1000)
    }
});
```