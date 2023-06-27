import ReactDOM from "react-dom/client";
import React, { ReactElement } from "react";
// @ts-ignore
import arcoCss from "./arco.css";

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
    if (!this.options.appendStyle) {
      this.options.style += this.options.appendStyle;
    }
  }

  static render(_this: HTMLElement & { options: UIPageOptions }) {
    let shadow = _this.attachShadow({ mode: "open" });
    let container = document.createElement("div");
    container.classList.add("container");

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
      <div>
        <Child />
      </div>
    );

    shadow.append(container);
  }
}

export default UIPage;
