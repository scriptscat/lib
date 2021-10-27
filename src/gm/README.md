## 油猴函数封装
> 具体使用请看单元测试:[tests/gm.test.ts](../../tests/gm.test.ts)

请注意,在使用对应的方法前,需要声明相应的`@grant`,例如ajax:

```ts
// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.1/dist/gm.js
// @definition https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.1/src/types/gm.d.ts

let resp = await ajax("https://bbs.tampermonkey.net.cn/");
```
