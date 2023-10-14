//暴露变量 方便调试
(window.unsafeWindow || window).CAT_UI = CAT_UI;
(window.unsafeWindow || window).React = React;
(window.unsafeWindow || window).ReactDOM = ReactDOM;
(window.unsafeWindow || window).jsxLoader = jsxLoader;

// 综合面板
const data = { input: "默认值" };

function Home() {
  const [input, setInput] = CAT_UI.useState(data.input);
  const [visibleUserConfig, setVisibleUserConfig] = CAT_UI.useState(false);
  return CAT_UI.Space(
    [
      CAT_UI.Text("脚本猫的UI框架: " + input),
      CAT_UI.Space(
        [
          CAT_UI.Button("我是按钮", {
            type: "primary",
            onClick() {
              CAT_UI.Message.info("我被点击了,你输入了: " + input);
            },
          }),
          CAT_UI.Button("打开用户配置面板", {
            type: "primary",
            onClick() {
              setVisibleUserConfig(true);
            },
          }),
        ],
        {
          direction: "horizontal",
        }
      ),
      CAT_UI.UserConfigPanel({
        title: "脚本用户配置",
        visible: visibleUserConfig,
        userConfig: GM_info.userConfig,
        defaultValues: {},
        onCancel() {
          setVisibleUserConfig(false);
        },
        onOk(values) {
          console.log(values);
          // GM_setValue
          setVisibleUserConfig(false);
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
}

function Typography() {
  const array1 = [
    CAT_UI.Typography.Title("Default", { heading: 5 }),
    CAT_UI.Typography.Paragraph(
      " A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in theform of a prototype, product or process. The verb to design expresses the process ofdeveloping a design. In some cases, the direct construction of an object without an explicitprior plan (such as in craftwork, some engineering, coding, and graphic design) may also beconsidered to be a design activity."
    ),
    CAT_UI.Typography.Title("Secondary", { heading: 5 }),
    CAT_UI.Typography.Paragraph(
      "A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. In some cases, the direct construction of an object without an explicit prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be considered to be a design activity.",
      { type: "secondary" }
    ),
    CAT_UI.Typography.Title("Spacing close", { heading: 5 }),
    CAT_UI.Typography.Paragraph(
      "A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design.",
      { type: "secondary", spacing: "close" }
    ),
  ];

  const [str, setStr] = CAT_UI.useState("Click the icon to edit this text.");
  const array2 = [
    CAT_UI.Typography.Paragraph("Click the icon to copy this text.", {
      copyable: true,
    }),
    CAT_UI.Typography.Paragraph(str, {
      editable: {
        onChange: setStr,
      },
    }),
  ];

  return CAT_UI.Space([CAT_UI.Typography(array1), CAT_UI.Typography(array2)], {
    direction: "vertical",
    style: { padding: "4px 36px" },
  });
}

CAT_UI.createPanel({
  //minButton控制是否显示最小化按钮，默认为true
  minButton: false,
  header: {
    title() {
      // createElement别名
      return CAT_UI.el(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          },
        },
        CAT_UI.Text("脚本猫的UI框架"),
        CAT_UI.Space([
          CAT_UI.Router.Link("首页", { to: "/" }),
          CAT_UI.Router.Link("Typography", { to: "/typography" }),
        ])
      );
    },
  },
  footer: {
    version: "0.1.0",
  },
  routes: [
    {
      path: "/",
      Component: Home,
    },
    {
      path: "/typography",
      Component: Typography,
    },
  ],
  onReady(panel) {
    panel.onDraggableStop((e) => {
      console.log(e);
    });
  },
});

//由于React 18渲染规则，顶级调用Message、Modal、Notification时需要使用异步方法，非顶级可直接调用
// Message
setTimeout(() => {
  CAT_UI.Message.success("你好，脚本猫");
}, 1000);

// Table
function initTable() {
  // 模拟XHR
  function simXHR() {
    return new Promise((resolve) => {
      const data = [
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
      setTimeout(() => resolve(data), 1000);
    });
  }

  // Resizeable
  const CustomResizeHandle = CAT_UI.React.forwardRef((props, ref) => {
    const { handleAxis, ...restProps } = props;
    return CAT_UI.createElement("span", {
      ref,
      className: `react-resizable-handle react-resizable-handle-${handleAxis}`,
      ...restProps,
      onClick: (e) => {
        e.stopPropagation();
      },
    });
  });
  const ResizableTitle = (props) => {
    const { onResize, width, children, ...restProps } = props;

    if (!width) {
      return CAT_UI.createElement("th", { ...restProps }, children);
    }

    return CAT_UI.Resizable(
      CAT_UI.createElement("th", { ...restProps }, children),
      {
        width,
        height: 0,
        handle: CAT_UI.createElement(CustomResizeHandle),
        onResize,
        draggableOpts: {
          enableUserSelectHack: false,
        },
      }
    );
  };

  let useTittle;
  let testData;
  let init = false;
  CAT_UI.createPanel({
    // min代表面板初始状态为最小化（仅显示header）
    min: true,
    onMin: (min) => {
      console.log("onMin", min);
      if (!init) init = true;
    },
    appendStyle: `.table-demo-resizable-column .react-resizable {
      position: relative;
      background-clip: padding-box;
    }
    
    .table-demo-resizable-column .react-resizable-handle {
      position: absolute;
      width: 10px;
      height: 100%;
      bottom: 0;
      right: -5px;
      cursor: col-resize;
      z-index: 1;
    }`,
    header: {
      title: () => {
        let tittle;
        [tittle, useTittle] = CAT_UI.useState("最大化后1s获取数据");
        return CAT_UI.Text("脚本猫的UI框架Resizeable Table " + tittle, {
          style: { fontSize: "16px" },
        });
      },
      // 控制图标大小 img→width svg→fontSize
      // CAT_UI.Icon中除了ScriptCat是img，其余均为svg ……待优化
      icon: CAT_UI.Icon.ScriptCat({
        style: { width: "24px", marginRight: "10px" },
        draggable: "false",
        // 这个class控制图标旋转spin
        className: "arco-icon-loading",
      }),
      style: { background: "#e5e5ff" },
    },
    footer: {
      version: "0.1.0",
    },
    render: () => {
      CAT_UI.useEffect(() => {
        if (init && !testData) {
          simXHR().then((data) => {
            testData = data;
            useTittle("数据已更新");
          });
        }
      });
      const inputRef = CAT_UI.useRef(null);
      const originColumns = [
        {
          title: "Name",
          dataIndex: "name",
          width: 120,
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
          width: 100,
        },
        {
          title: "Address",
          dataIndex: "address",
          width: 180,
        },
        {
          title: "Email",
          dataIndex: "email",
        },
      ];

      const [columns, setColumns] = CAT_UI.useState(
        originColumns.map((column, index) => {
          if (column.width) {
            return {
              ...column,
              onHeaderCell: (col) => ({
                width: col.width,
                onResize: handleResize(index),
              }),
            };
          }

          return column;
        })
      );
      function handleResize(index) {
        return (e, { size }) => {
          setColumns((prevColumns) => {
            const nextColumns = [...prevColumns];
            nextColumns[index] = { ...nextColumns[index], width: size.width };
            return nextColumns;
          });
        };
      }
      const components = {
        header: {
          th: ResizableTitle,
        },
      };

      return CAT_UI.Table({
        className: "table-demo-resizable-column",
        columns,
        data: testData,
        loading: !!!testData,
        components,
        border: true,
        borderCell: true,
      });
    },
  });
}

initTable();

// Typography
CAT_UI.createPanel({
  // 相当于GM_addStyle
  appendStyle: `section {
    max-width:500px;
    box-shadow:0px 0px 5px;
  }`,
  // 面板初始坐标
  point: { x: (window.screen.width - 500) / 2, y: 20 },
  header: {
    title: CAT_UI.Space(
      [
        CAT_UI.Icon.ScriptCat({
          style: { width: "24px", verticalAlign: "middle" },
          draggable: "false",
        }),
        CAT_UI.Text("脚本猫的UI框架Typography", {
          style: { fontSize: "16px" },
        }),
      ],
      { style: { marginLeft: "5px" } }
    ),
    style: { borderBottom: "1px solid var(--color-neutral-3)" },
  },
  render: Typography,
});

// Drawer / Modal
function DM() {
  const [visible, setVisible] = CAT_UI.useState(false);
  return CAT_UI.Space([
    CAT_UI.Button("Open Drawer", {
      type: "primary",
      onClick: () => setVisible(true),
    }),
    CAT_UI.Button("Open Modal", {
      type: "primary",
      onClick: () => {
        const modal = CAT_UI.Modal.info({
          style: { cursor: "move", userSelect: "none" },
          title: "Modal Title",
          content: CAT_UI.createElement(
            "p",
            null,
            "You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button."
          ),
          onOk: () => (CAT_UI.Message.success("OK"), modal.close()),
          onCancel: () => CAT_UI.Message.warning("Cancel"),
          autoFocus: false,
          modalRender: (modal) => CAT_UI.Draggable(modal),
        });
      },
    }),
    CAT_UI.Drawer(
      CAT_UI.createElement("div", { style: { textAlign: "left" } }, [
        "Here is an example text.",
        CAT_UI.Divider("divider with text"),
        "text2",
        CAT_UI.Divider(null, { type: "vertical" }),
        "text3",
      ]),
      {
        title: "Basic",
        visible,
        focusLock: true,
        autoFocus: true,
        zIndex: 10000,
        onOk: () => {
          setVisible(false);
        },
        onCancel: () => {
          setVisible(false);
        },
      }
    ),
  ]);
}

CAT_UI.createPanel({
  // 强制固定Drawer
  appendStyle: `.arco-drawer-wrapper {
    position: fixed !important;
  }`,
  header: {
    title: CAT_UI.Space(
      [
        CAT_UI.Icon.ScriptCat({
          style: { width: "24px", verticalAlign: "middle" },
          draggable: "false",
        }),
        CAT_UI.Text("脚本猫的UI框架Drawer Modal", {
          style: { fontSize: "16px" },
        }),
      ],
      { style: { marginLeft: "5px" } }
    ),
    style: { borderBottom: "1px solid var(--color-neutral-3)" },
  },
  render: DM,
});

CAT_UI.create({
  appendStyle: `.menu-demo-button {
    position: fixed;
    bottom:20px;
  }
  
  .button-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 25px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 14px;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.1s;
  }
  
  .button-trigger:nth-child(1) {
    left: 50px;
    background-color: var(--color-neutral-5);
  }
  
  .button-trigger:nth-child(1).button-trigger-active {
    background-color: var(--color-neutral-4);
  }
  
  .button-trigger:nth-child(2) {
    left: 125px;
    background-color: rgb(var(--arcoblue-6));
  }
  
  .button-trigger:nth-child(2).button-trigger-active {
    background-color: var(--color-primary-light-4);
  }`,
  render: () => {
    const [popupVisibleOne, setPopupVisibleOne] = CAT_UI.useState(false);
    const [popupVisibleTwo, setPopupVisibleTwo] = CAT_UI.useState(false);

    const renderMenu = () =>
      CAT_UI.Menu(
        [
          CAT_UI.Menu.Item([CAT_UI.Icon.IconBug(), "Bugs"], { key: "1" }),
          CAT_UI.Menu.Item([CAT_UI.Icon.IconBulb(), "Ideas"], { key: "2" }),
        ],
        {
          style: { marginBottom: -4 },
          mode: "popButton",
          tooltipProps: { position: "left", style: { userSelect: "none" } },
          hasCollapseButton: true,
          onClickMenuItem: (keyPath, event) => {
            console.log(keyPath, event);
            CAT_UI.Message.info("点击了CAT_UI.Menu.Item，keyPath: " + keyPath);
          },
        }
      );

    const Trigger1 = CAT_UI.Trigger(
      CAT_UI.createElement(
        "div",
        {
          className: `button-trigger ${
            popupVisibleOne ? "button-trigger-active" : ""
          }`,
        },
        popupVisibleOne ? CAT_UI.Icon.IconClose() : CAT_UI.Icon.IconMessage()
      ),
      {
        popup: renderMenu,
        trigger: ["click", "hover"],
        clickToClose: true,
        position: "top",
        onVisibleChange: (v) => setPopupVisibleOne(v),
        style: { userSelect: "none", left: -4 },
        getPopupContainer: (node) => node,
      }
    );

    const Trigger2 = CAT_UI.Trigger(
      CAT_UI.createElement(
        "div",
        {
          className: `button-trigger ${
            popupVisibleTwo ? "button-trigger-active" : ""
          }`,
        },
        popupVisibleTwo ? CAT_UI.Icon.IconClose() : CAT_UI.Icon.IconMessage()
      ),
      {
        popup: renderMenu,
        trigger: ["click"],
        clickToClose: true,
        position: "top",
        onVisibleChange: (v) => setPopupVisibleTwo(v),
        style: { userSelect: "none", left: -4 },
        getPopupContainer: (node) => node,
      }
    );

    return CAT_UI.Draggable(
      CAT_UI.createElement(
        "div",
        {
          className: "menu-demo menu-demo-button",
          style: { userSelect: "none" },
        },
        [Trigger1, Trigger2]
      )
    );
  },
});
