// ==UserScript==
// @name        CAT_UI_BONE
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  try to take over the world!
// @author       Bigonion
// @match        *
// ==/UserScript==

(function () {
    'use strict';
    // Your code here...

    //暴露变量 方便调试
    (window.unsafeWindow || window).CAT_UI = CAT_UI;


    /**
     * @description 创建脚本猫UI面板，面板里需要设置位置、标题、和内容等信息
    */
    const panel = {
        // 是否展示最小化按钮
        minButton: ture,

        // 为面板section元素添加样式，这里也可以写其他Class/Id的全局样式，与GM_addstyle差不多
        appendStyle: `   
        section {
        box-shadow: 10px 10px 20px 10px pink;
        min-width:300px;
        position: fixed !important;
        }`,

        // 为面板添加绝对坐标，单位是px
        point: { x: 600, y: 100 },

        // 为面板添加header头内容，此部分能够被拖拽
        header: {

            // space是包裹内容的大盒子，内容由Text/Typography/Title等构成的数组
            title: CAT_UI.Space(
                [
                    //Text是普通文本，可以添加style对象来控制此文本的样式
                    CAT_UI.Text("脚本猫的UI骨架",
                        {
                            style: { fontSize: "16px" },
                        }),
                ],

                // style是title的自定义样式，命名与React一致，如把"margin-left"改成"marginLeft"驼峰命名
                { style: { marginLeft: "20px" } }
            ),
        },

        // render渲染的内容是，在header标头下面将要渲染的内容
        render: Typography,
    }

    /**
     * @description 下面是header下面要渲染的内容，依旧由Space包裹
    */
    function Typography() {

        // 内容1，其排列顺序与数组顺序一致
        const content1 = [

            // 标题，通过heading设置大小，heading:5表示用h5包裹文本，字体大小：h1>h2>h3...
            CAT_UI.Typography.Title("标题1", { heading:5 }),
            
            // 普通的段落文本，自带换行和间距样式
            CAT_UI.Typography.Paragraph(`段落文本`),
            
            // 自定义样式的段落
            CAT_UI.Typography.Paragraph(`复制文本`,
            {
                style: { color: "red" },
            }),

            // 自定义样式的可复制的段落文本
            CAT_UI.Typography.Paragraph(`复制文本`,
            {
                style: { color: "blue" },
                copyable: true,
            },
            ),

            // 普通文本没有自带样式，需要额外自行添加样式
            CAT_UI.Text("普通文本",
            {
                style: { color: "green" },
            }),

        ];

        // 内容2，与上面内容1平行，分开写，全都写在上面也可以
        const content2 = [
            // 用h4包裹内容
            CAT_UI.Typography.Title("标题2", { heading: 4 }),
        ];

        // 通过Space可以拼接多个Typography内容，space还可以添加渲染header和内容的方向和自定义样式
        return CAT_UI.Space(
            [
            CAT_UI.Typography(content1),
            CAT_UI.Typography(content2)
            ],
            {
                //水平是horizon
                direction: "vertical",
                style: { padding: "4px 36px" },
            });
    }

    // 最后把panel交给createPanel来渲染
    CAT_UI.createPanel(panel);
})();