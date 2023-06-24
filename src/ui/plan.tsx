import { ReactElement } from "react";
import ReactDOM from "react-dom/client";
import UIPage, { UIPageOptions } from "./page";
import arcoCss from "./arco.css";
import { Layout } from "@arco-design/web-react";

export type UIPlanOptions = UIPageOptions & {
  appendStyle?: string;
};

// 创建UI面板
class UIPlan extends HTMLElement {
  options: UIPlanOptions;

  constructor() {
    super();
    // @ts-ignore
    this.options = UIPlan.options;
    if (!this.options.style) {
      this.options.style = arcoCss as unknown as string;
    }
    if (this.options.appendStyle) {
      this.options.style += this.options.appendStyle;
    }
    const oldRender = this.options.render;
    const Child = (): ReactElement => {
      const ret = oldRender();
      if (ret instanceof Array) {
        return ret.map((val) => {
          return val;
        }) as unknown as ReactElement;
      }
      return ret as ReactElement;
    };
    this.options.render = () => {
      return (
        <Layout
          style={{
            position: "absolute",
            border: "1px solid var(--color-border-2)",
            background: "var(--color-bg-1)",
            top: "100px",
            borderRadius: "6px",
          }}
        >
          <Layout.Header>Header</Layout.Header>
          <Layout.Content>
            <Child />
          </Layout.Content>
          <Layout.Footer>Footer</Layout.Footer>
        </Layout>
      );
    };
    UIPage.render(this);
  }
}

export default UIPlan;
