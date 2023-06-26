const data = { input: "默认值" };

CAT_UI.createPanel({
	header: {
		title: "脚本猫的UI框架",
	},
	footer: {
		version: "0.1.0",
	},
	render() {
		const [input, setInput] = CAT_UI.useState(data.input);
		return CAT_UI.Space([
			CAT_UI.Text("脚本猫的UI框架: " + input),
			CAT_UI.Button("我是按钮", {
				type: "primary",
				onClick() {
					CAT_UI.Message.info("我被点击了,你输入了: " + input);
				}
			}),
			CAT_UI.Input({
				value: input,
				onChange(val) {
					setInput(val);
					data.input = val;
				}
			}),
			CAT_UI.Checkbox("我是复选框"),
			CAT_UI.Select([
				CAT_UI.Select.Option("选项1"),
				CAT_UI.Select.Option("选项2"),
			]),
			CAT_UI.createElement("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center"
				}
			}, CAT_UI.Text("请输入"), CAT_UI.Input({
				value: input,
				onChange(val) {
					setInput(val);
					data.input = val;
				},
				style: {
					flex: 1
				}
			}),
            CAT_UI.Icon.IconStar({style:{ fontSize: 24, color: '#ff0000' }}),
            CAT_UI.Icon.IconSync({spin:true,style:{fontSize: 24}}),
            ),
		], {
			direction: "vertical"
		});
	},
	onReady(panel) {
		panel.onDraggableStop((e) => {
			console.log(e)
		});
	}
});

CAT_UI.Message.success("你好，脚本猫");

//暴露变量 方便调试
(window.unsafeWindow || window).CAT_UI=CAT_UI
