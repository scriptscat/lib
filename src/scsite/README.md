# scriptcat

与脚本猫脚本站相关的工具库

## guide

可以自动的弹出引导窗口，前往脚本站进行评分

```js
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @require https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.6/dist/scsite.js
// @definition https://cdn.jsdelivr.net/npm/scriptcat-lib@1.1.6/src/types/scsite.d.ts

const guide=new scsite.guide(1);
guide.auto();
```

