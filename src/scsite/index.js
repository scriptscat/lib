window.scsite = {};
window.scsite.guide = function (id) {
  const _this = {
    // 自动弹出(需要GM_get/setValue权限)
    auto: function () {
      if (self != top) {
        return;
      }
      if (GM_getValue("guide", false)) {
        return;
      }
      const runDate = GM_getValue("runDate", 0);
      if (!runDate) {
        GM_setValue("runDate", new Date().getTime() / 1000);
      } else if (new Date().getTime() / 1000 - runDate > 600) {
        // 运行10分钟后弹出
        _this.open();
      }
    },
    // 手动弹出
    open: function () {
      const script = GM_info && GM_info.script;
      if (!script) {
        script = { name: "NULL" };
      }
      const div = document.createElement("div");
      div.style.position = "fixed";
      div.style.left = "50%";
      div.style.top = "50%";
      div.style.transform = "translate(-50%, -50%)";
      div.style.background = "#fff";
      document.body.appendChild(div);
      const shadowRoot = div.attachShadow({ mode: "open" });
      let icon = ``;
      if (script.icon) {
        icon = `<div class="icon"><img src="${script.icon}" width="42" height="42" /></div>`;
      } else {
        icon = `<div class="icon"><span>${script.name.substr(
          0,
          1
        )}</span></div>`;
      }
      shadowRoot.innerHTML = `
    <style>
    .box{
    padding: 14px 0px 0px;
    background: #FFF;
    border: 1px solid #c6c6c6;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 1px 4px 0 rgba(222, 219, 219, 0.2), 0 1px 4px 0 rgba(132, 132, 132, 0.19);
    }
    .text-wrap{
    padding:0px  14px;
    line-height: 1.9;
    }

    .icon{
    margin-bottom: 5px;
    
    }
    .icon img{
        border-radius: 14px;
    border: 1px solid;
    }
    .btn{
    border-top: 1px solid #c6c6c6;
    display: flex;
    flex-wrap: nowrap;
    margin-top: 12px;
    }
    .btn a{
    text-decoration: none;
    color:#7b7b7b;
    flex:1 1 0;
    padding: 7px 0;
    cursor: pointer;
    }
    .btn a:hover{
    color: #fff;
    background: #d6d6d6;
    }
    .btn a:first-child {
      border-right: 1px solid #c6c6c6;
     }
     .content{
         padding: 0px 14px 0px;
     }
    </style>
    
    <div class="box">
    ${icon}
    <div class="content">
    <div class="description">喜欢"${script.name}"吗？</div>
    <div class="guide">点击下方按钮在脚本猫中评分吧</div>
    </div>
    <div class="btn"><a class="cancel">取消</a><a class="goto" href="https://scriptcat.org/script-show-page/${id}/comment" target="_blank">前往</a></div>
    </div>`;

      shadowRoot.querySelector(".cancel").onclick = function () {
        div.remove();
        GM_setValue("guide", true);
      };

      shadowRoot.querySelector(".goto").onclick = function () {
        div.remove();
        GM_setValue("guide", true);
      };
    },
  };
  return _this;
};
