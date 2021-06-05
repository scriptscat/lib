## lib

> 提供给脚本`require`的库

[TOC]

### 消息推送

**声明**

请在脚本中加入如下 3 行

```ts
// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/npm/scriptcat-lib@1.0.1/dist/msg-push.js
// @definition https://cdn.jsdelivr.net/npm/scriptcat-lib@1.0.1/src/types/msg-push.d.ts
```

**使用**

```ts
let dingtalk = new DingTalk("token", "secret");
let wechat = new Wechat("key");

let center = new MsgCenter([dingtalk, wechat]);
let results = await center.pushMsg({
  type: "text",
  content: "test",
});
for (const key in results) {
  let result = results[key];
  expect(result.error()).toEqual("");
  expect(result.code()).toEqual(0);
}
// 不同平台发送不同内容
let results = await center.pushMsg({
  type: "text",
  content: "test",
  param: {
    wechat: {
      type: "markdown",
      content: "# h1",
    },
  },
});
```
