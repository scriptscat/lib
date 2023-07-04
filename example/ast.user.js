//函数式方法：CAT_UI.XXX
//文本式方法：const cat = new CAT_UI(); 下方使用ast便于区分
const ast = new CAT_UI();
(window.unsafeWindow || window).ast = ast;

ast.addStyle(`
.flex{
  display: flex;
  flex: 1;
}

.justify-between{
  justify-content: space-between;
}

.min-btn:hover{
  color: var(--color-primary-5);
  background: var(--color-bg-2);
}

section {
    max-width:500px;
    box-shadow:0px 0px 5px;
}
`);

// 混搭 函数式
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

const options = {
  point: { x: (window.screen.width - 500) / 2, y: 20 },
  header: {
    title: () =>
      CAT_UI.Space(
        [
          CAT_UI.Icon.ScriptCat({
            style: { width: "24px", verticalAlign: "middle" },
            draggable: "false",
          }),
          CAT_UI.Text("脚本狗的UI框架Typography（AST文本式实现方法）", {
            style: { fontSize: "16px" },
          }),
        ],
        { style: { marginLeft: "5px" } }
      ),
    style: { borderBottom: "1px solid var(--color-neutral-3)" },
  },
};

// 混搭 模板字符串
function Panel() {
  const [min, setMin] = ast.useState(options.min ?? false);
  const MinIcon = min
    ? CAT_UI.moudles.Icon.IconPlus
    : CAT_UI.moudles.Icon.IconMinus;
  const onMin = (min) => setMin(min);
  // jsx开头要顶格写 否则可能会被库识别错误
  const jsx = `<Draggable
  handle=".draggable"
  onStop={(e, d) => {
      this.draggableStopCallback &&
          this.draggableStopCallback({
              x: d.x,
              y: d.y,
          });
  }}
>
  <Layout
      style={{
          position: 'absolute',
          border: '1px solid var(--color-border-2)',
          background: 'var(--color-bg-1)',
          top: (options?.point?.y ?? 0) + 'px',
          left: (options?.point?.x ?? 0) + 'px',
          borderRadius: '6px',
          zIndex: '1000',
          overflow: 'hidden',
      }}
  >
      <Layout.Header
          className="flex"
          style={{
              alignItems: 'center',
              padding: '4px 6px',
          }}
      >
          <div
              className="draggable flex"
              style={{
                  flex: 1,
                  cursor: 'move',
                  alignItems: 'center',
                  userSelect: 'none',
                  MozUserSelect: '-moz-none',
              }}
          >
              {title}
          </div>
          <Button
              type="text"
              className="min-btn"
              {/* JSX元素名以$结尾转义变量，视为使用传入变量，否则均视为CAT_UI组件变量*/}
              icon={<MinIcon$ />}
              iconOnly={true}
              size="small"
              onClick={() => onMin(!min)}
          />
      </Layout.Header>
      <Layout.Content
          style={{
              padding: '4px 6px',
              display: !min ? 'unset' : 'none',
          }}
      >
          {TypographyApp}
      </Layout.Content>
  </Layout>
</Draggable>;
`;
  // 传递变量引用
  return ast.createApp(jsx, {
    title: options.header.title(),
    TypographyApp: ast.createApp(Typography.toString()),
    min,
    setMin,
    onMin,
    MinIcon, // 不需要加$
    options,
  });
}
ast.render(ast.createApp(Panel));
