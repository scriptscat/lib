// ==UserScript==
// @name         脚本猫UI库
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  基于Arco做的UI库, 用于快速开发脚本的UI界面
// @author       You
// @match        https://bbs.tampermonkey.net.cn/
// ==/UserScript==

const data = { input: "默认值" };

CAT_UI.create({
	render() {
		const [input, setInput] = CAT_UI.useState(data.input);
		return [
			CAT_UI.Text("脚本猫的UI框架" + input),
			CAT_UI.Button("我是按钮", () => {
				alert("我被点击了,你输入了: " + input);
			}),
			CAT_UI.Input(input, (val) => {
				setInput(val);
				data.input = val;
			}),
		];
	},
});
