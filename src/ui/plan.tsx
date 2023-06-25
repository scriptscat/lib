import React, { MutableRefObject, ReactElement, useRef, useState } from "react";
import UIPage, { UIPageOptions } from "./page";
import { Button, Layout, Space, Typography } from "@arco-design/web-react";
import { IconMinus } from "@arco-design/web-react/icon";
import Draggable from "react-draggable";
// @ts-ignore
import arcoCss from "./arco.css";

export type UIPlanOptions = UIPageOptions & {
  appendStyle?: string;
  min?: boolean;
  point?: {
    x: number;
    y: number;
  };
  header?: {
    title?: string;
  };
  footer?: {
    version?: string;
  };
  onReady?: (plan: UIPlan) => void;
};

// 创建UI面板
class UIPlan extends HTMLElement {
  options: UIPlanOptions;

  constructor() {
    super();
    // @ts-ignore
    this.options = UIPlan.options;
    this.defaultOptions();
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
      const ref = useRef<HTMLElement>();
      const [min, setMin] = useState(false);
      return (
        <Draggable
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
              position: "absolute",
              border: "1px solid var(--color-border-2)",
              background: "var(--color-bg-1)",
              top: "0px",
              left: "0px",
              borderRadius: "6px",
              zIndex: "1000",
            }}
            ref={ref}
          >
            <UIPlan.DefaultHeader
              title={this.options.header?.title || "UIPlan"}
              min={min}
              onMin={() => setMin(!min)}
              plan={ref}
            />
            {!min && (
              <Layout.Content
                style={{
                  padding: "4px 6px",
                }}
              >
                <Child />
              </Layout.Content>
            )}
            {!min && (
              <UIPlan.DefaultFooter version={this.options.footer?.version} />
            )}
          </Layout>
        </Draggable>
      );
    };
    UIPage.render(this);
    this.options.onReady && this.options.onReady(this);
  }

  draggableStopCallback?: (event: { x: number; y: number }) => void;

  onDraggableStop(callback: (event: { x: number; y: number }) => void) {
    this.draggableStopCallback = callback;
  }

  protected defaultOptions() {
    if (!this.options.style) {
      this.options.style = arcoCss as unknown as string;
      this.options.style += `
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
      `;
    }
    if (!this.options.appendStyle) {
      this.options.style += this.options.appendStyle;
    }
    if (!this.options.header) {
      this.options.header = {};
    }
    if (!this.options.footer) {
      this.options.footer = {};
    }
  }

  static DefaultHeader(props: {
    title: string;
    min?: boolean;
    plan: MutableRefObject<HTMLElement | undefined>;
    onMin?: () => void;
  }) {
    return (
      <Layout.Header
        className="flex"
        style={{
          alignItems: "center",
          padding: "4px 6px",
        }}
      >
        <div
          className="draggable"
          style={{
            flex: 1,
            cursor: "move",
          }}
        >
          <Typography.Text style={{ fontSize: "16px" }}>
            {props.title}
          </Typography.Text>
        </div>
        <Button
          type="text"
          className="min-btn"
          icon={<IconMinus />}
          iconOnly
          size="small"
          onClick={() => {
            props.onMin && props.onMin();
          }}
        />
      </Layout.Header>
    );
  }

  static DefaultFooter(props: { version?: string }) {
    return (
      <Layout.Footer
        className="flex"
        style={{
          alignItems: "center",
          padding: "4px 6px",
        }}
      >
        <div className="flex">{props.version && props.version}</div>
      </Layout.Footer>
    );
  }
}

export default UIPlan;
