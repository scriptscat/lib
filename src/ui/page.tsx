import ReactDOM from "react-dom/client";
import arcoCss from "./arco.css";
import { Button } from "@arco-design/web-react";
import { ReactElement, useState } from "react";

export type UIPageOptions = {
  render: () => JSX.Element[] | JSX.Element;
};

// Web Component实现
class UIPage extends HTMLElement {
  options: UIPageOptions;

  constructor() {
    super();
    // @ts-ignore
    this.options = UIPage.options;
    UIPage.render(this);
  }

  static render(_this: UIPage) {
    // @ts-ignore
    console.log(UIPage.options, this.options);
    let shadow = _this.attachShadow({ mode: "closed" });
    let container = document.createElement("div");
    container.classList.add("container");

    let css = document.createElement("style");
    // @ts-ignore
    css.innerHTML = arcoCss;

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

    shadow.append(css, container);
  }
}

export default UIPage;
