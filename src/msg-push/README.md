
## 消息推送

**声明**

请在脚本中加入如下 3 行

```ts
// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/npm/scriptcat-lib@1.0.4/dist/msg-push.js
// @definition https://cdn.jsdelivr.net/npm/scriptcat-lib@1.0.4/src/types/msg-push.d.ts
```
**支持平台**

* 钉钉
* 微信
* PushPlus
* Telegram

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
let param = {};
param[wechat.platform()] = {
  type: "markdown",
  content: "# h1",
};
let results = await center.pushMsg({
  type: "text",
  content: "test",
  param: param,
});
```
