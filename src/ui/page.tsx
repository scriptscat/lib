import ReactDOM from "react-dom/client";
import { Button } from "@arco-design/web-react";
import { ReactElement, useState } from "react";

export type UIPageOptions = {
  style?: string;
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
