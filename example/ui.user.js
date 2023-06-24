const data = { input: "默认值" };

CAT_UI.createPlan({
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
