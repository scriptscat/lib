//暴露变量 方便调试
(window.unsafeWindow || window).CAT_UI = CAT_UI;

// 综合面板
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
    return CAT_UI.Space(
      [
        CAT_UI.Text("脚本猫的UI框架: " + input),
        CAT_UI.Button("我是按钮", {
          type: "primary",
          onClick() {
            CAT_UI.Message.info("我被点击了,你输入了: " + input);
          },
        }),
        CAT_UI.Input({
          value: input,
          onChange(val) {
            setInput(val);
            data.input = val;
          },
        }),
        CAT_UI.Checkbox("我是复选框"),
        CAT_UI.Select([
          CAT_UI.Select.Option("选项1"),
          CAT_UI.Select.Option("选项2"),
        ]),
        CAT_UI.createElement(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          },
          CAT_UI.Text("请输入"),
          CAT_UI.Input({
            value: input,
            onChange(val) {
              setInput(val);
              data.input = val;
            },
            style: {
              flex: 1,
            },
          }),
          CAT_UI.Icon.IconStar({ style: { fontSize: 24, color: "#ff0000" } }),
          CAT_UI.Icon.IconSync({ spin: true, style: { fontSize: 24 } })
        ),
      ],
      {
        direction: "vertical",
      }
    );
  },
  onReady(panel) {
    panel.onDraggableStop((e) => {
      console.log(e);
    });
  },
});

// Message
CAT_UI.Message.success("你好，脚本猫");

// Table
const testData = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
  {
    key: "4",
    name: "Ed Hellen",
    salary: 17000,
    address: "42 Park Road, London",
    email: "ed.hellen@example.com",
  },
  {
    key: "5",
    name: "William Smith",
    salary: 27000,
    address: "62 Park Road, London",
    email: "william.smith@example.com",
  },
];

CAT_UI.createPanel({
  header: {
    title: CAT_UI.Text("脚本猫的UI框架Table", {
      style: { fontSize: "16px" },
    }),
    // 控制图标大小 img→width svg→fontSize
    // CAT_UI.Icon中除了ScriptCat是img，其余均为svg ……待优化
    icon: CAT_UI.Icon.ScriptCat({
      style: { width: "24px", marginRight: "10px" },
      draggable: "false",
      className: "arco-icon-loading",
    }),
    style: { background: "#e5e5ff" },
  },
  footer: {
    version: "0.1.0",
  },
  render() {
    // 下方均为官方示例https://arco.design/react/components/table#自定义筛选菜单
    // 转译成ui.js封装形式
    const inputRef = CAT_UI.useRef(null);
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        filterIcon: CAT_UI.Icon.IconSearch(),
        filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
          return CAT_UI.createElement(
            "div",
            {
              // className: "arco-table-custom-filter",
              style: {
                padding: "10px",
                "background-color": "var(--color-bg-5)",
                "box-shadow": "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
              },
            },
            CAT_UI.Input.Search({
              ref: inputRef,
              searchButton: true,
              placeholder: "Please enter name",
              value: filterKeys[0] || "",
              onChange: (value) => {
                setFilterKeys(value ? [value] : []);
              },
              onSearch: () => {
                confirm();
              },
            })
          );
        },
        onFilter: (value, row) =>
          value ? row.name.indexOf(value) !== -1 : true,
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => inputRef.current.focus(), 150);
          }
        },
      },
      {
        title: "Salary",
        dataIndex: "salary",
      },
      {
        title: "Address",
        dataIndex: "address",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
    ];
    return CAT_UI.Table({ columns, data: testData });
  },
});

// Typography
CAT_UI.createPanel({
  // 相当于GM_addStyle
  appendStyle: `section {width:500px}`,
  header: {
    title: CAT_UI.Space([
      CAT_UI.Icon.ScriptCat({
        style: { width: "24px" },
        draggable: "false",
      }),
      CAT_UI.Text("脚本猫的UI框架Typography", {
        style: { fontSize: "16px" },
      }),
    ]),
  },
  render() {
    const array1 = [];
    array1.push(CAT_UI.Typography.Title("Default", { heading: 5 }));
    array1.push(
      CAT_UI.Typography.Paragraph(
        " A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in theform of a prototype, product or process. The verb to design expresses the process ofdeveloping a design. In some cases, the direct construction of an object without an explicitprior plan (such as in craftwork, some engineering, coding, and graphic design) may also beconsidered to be a design activity."
      )
    );
    array1.push(CAT_UI.Typography.Title("Secondary", { heading: 5 }));
    array1.push(
      CAT_UI.Typography.Paragraph(
        "A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.",
        { type: "secondary" }
      )
    );
    array1.push(CAT_UI.Typography.Title("Spacing close", { heading: 5 }));
    array1.push(
      CAT_UI.Typography.Paragraph(
        "A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.",
        { type: "secondary", spacing: "close" }
      )
    );

    const [str, setStr] = CAT_UI.useState("Click the icon to edit this text.");
    const array2 = [];
    array2.push(
      CAT_UI.Typography.Paragraph("Click the icon to copy this text.", {
        copyable: true,
      })
    );
    array2.push(
      CAT_UI.Typography.Paragraph(str, {
        editable: {
          onChange: setStr,
        },
      })
    );

    return CAT_UI.Space(
      [CAT_UI.Typography(array1), CAT_UI.Typography(array2)],
      { direction: "vertical" }
    );
  },
});
