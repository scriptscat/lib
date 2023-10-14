import ReactDOM from "react-dom/client";
import arcoCss from "./arco.css?inline";
import { ConfigProvider } from "@arco-design/web-react";
import CAT_UI from "./ui";

export type UIPageOptions = {
  style?: string;
  appendStyle?: string;
  zIndex?: boolean;
  render?: () => JSX.Element[] | JSX.Element;
  onReady?: (panel: UIPage) => void;
};

// Web Component实现
class UIPage extends HTMLElement {
  options: UIPageOptions;

  constructor() {
    super();
    // @ts-ignore
    this.options = UIPage.options;
    this.defaultOptions();
    UIPage.render(this);
    this.options.onReady && this.options.onReady(this);
  }

  protected defaultOptions() {
    this.options = Object.assign({}, this.options);
    if (!this.options.style) {
      this.options.style = arcoCss as unknown as string;
    }
    if (this.options.appendStyle) {
      this.options.style += this.options.appendStyle;
    }
  }

  static render(_this: HTMLElement & { options: UIPageOptions }) {
    const shadow = _this.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("arco");
    container.style.cssText = "position: absolute; top: 0px; width: 100%;";

    if (_this.options.style) {
      const css = document.createElement("style");
      css.innerHTML = _this.options.style;
      shadow.append(css);
    }

    const Child = (): JSX.Element => {
      if (_this.options.render instanceof Array) {
        return (_this.options.render() as JSX.Element[]).map((val) => {
          return val;
        }) as unknown as JSX.Element;
      }
      return _this.options.render?.() as JSX.Element;
    };

    const Zindex = (props: { children: JSX.Element }): JSX.Element => {
      if (_this.options.zIndex === false) {
        return <div>{props.children}</div>;
      } else {
        container.style.zIndex = "" + ++CAT_UI.zIndex;
        return (
          <div
            tabIndex={CAT_UI.tabIndex++}
            onFocus={() => {
              if (container.style.zIndex != CAT_UI.zIndex) {
                container.style.zIndex = "" + ++CAT_UI.zIndex;
              }
            }}
          >
            {props.children}
          </div>
        );
      }
    };
    const root = ReactDOM.createRoot(container);
    _this.options.render &&
      root.render(
        <Zindex>
          {/*定义全局Popup弹出挂载容器 Modal、Drawer要单独设置 不知是否为框架BUG*/}
          <ConfigProvider
            getPopupContainer={() => container}
            componentConfig={{
              Modal: { getPopupContainer: () => container },
              Drawer: { getPopupContainer: () => container },
            }}
          >
            <Child />
          </ConfigProvider>
        </Zindex>
      );

    shadow.append(container);
  }
}

export default UIPage;
