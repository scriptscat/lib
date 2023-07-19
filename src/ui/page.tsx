import ReactDOM from "react-dom/client";
import React, { ReactElement } from "react";
// @ts-ignore
import arcoCss from "./arco.css";
import { ConfigProvider } from "@arco-design/web-react";

export type UIPageOptions = {
  style?: string;
  appendStyle?: string;
  render: () => JSX.Element[] | JSX.Element;
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
    console.log(this.options);
    if (!this.options.style) {
      this.options.style = arcoCss as unknown as string;
    }
    if (this.options.appendStyle) {
      this.options.style += this.options.appendStyle;
    }
  }

  static render(_this: HTMLElement & { options: UIPageOptions }) {
    let shadow = _this.attachShadow({ mode: "open" });
    let container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("arco");

    if (_this.options.style) {
      let css = document.createElement("style");
      css.innerHTML = _this.options.style;
      shadow.append(css);
    }

    const Child = (): ReactElement => {
      if (_this.options.render instanceof Array) {
        return (_this.options.render() as JSX.Element[]).map((val) => {
          return val;
        }) as unknown as ReactElement;
      }
      return _this.options.render() as ReactElement;
    };

    ReactDOM.createRoot(container).render(
      <div
        tabIndex={window.CAT_UI.tabIndex++}
        onFocus={(e) => {
          if (e.target.style.zIndex != window.CAT_UI.zIndex) {
            e.target.style.zIndex = "" + ++window.CAT_UI.zIndex;
          }
        }}
        style={{
          position: "absolute",
          top: "0px",
          width: "100%",
        }}
      >
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
      </div>
    );

    shadow.append(container);
  }
}

export default UIPage;
