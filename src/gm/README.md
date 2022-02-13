## 油猴函数封装

> 具体使用请看单元测试:[tests/gm.test.ts](../../tests/gm.test.ts)

请注意,在使用对应的方法前,需要声明相应的`@grant`,例如 ajax:

```ts
// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.2/dist/gm.js
// @definition https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.2/src/types/gm.d.ts

let resp = await gm.ajax("https://bbs.tampermonkey.net.cn/");

// 重试
const client = ajax.create();
ajax.ajaxRetry(client, { retries: 1});
resp = await client.get("http://example.com/test");

```

### gm.ajax

感谢: [https://github.com/Trim21/axios-userscript-adapter](https://github.com/Trim21/axios-userscript-adapter) gm.ajax 底层使用此库实现

gm.ajax 与 axios 使用方法一致

### ajaxRetry

底层为: [axios-retry](https://www.npmjs.com/package/axios-retry)库
