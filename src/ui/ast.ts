import arcoCss from "./arco.css";
import {
  Affix,
  Alert,
  Anchor,
  AutoComplete,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Carousel,
  Cascader,
  Checkbox,
  Collapse,
  Comment,
  ConfigProvider,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Dropdown,
  Empty,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  InputNumber,
  InputTag,
  Layout,
  Link,
  List,
  Mentions,
  Menu,
  Message,
  Modal,
  Notification,
  PageHeader,
  Pagination,
  Popconfirm,
  Popover,
  Portal,
  Progress,
  Radio,
  Rate,
  ResizeBox,
  Result,
  Select,
  Skeleton,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  Transfer,
  Tree,
  TreeSelect,
  Trigger,
  Typography,
  Upload,
} from "@arco-design/web-react";
import {
  useState,
  useRef,
  useEffect,
  createElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  FunctionComponent,
} from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import Draggable from "react-draggable";

class AST {
  shadowRoot!: ShadowRoot;
  container!: HTMLDivElement;
  Notification!: typeof Notification;
  Message!: typeof Message;
  static moudles: any;

  constructor() {
    this.#createShadow();
    this.#initProxy();
    this.#assignMoudles();
  }

  // 创建App
  createApp(code: string | FunctionComponent<{}>, argument = {}) {
    if (typeof code == "function") {
      return createElement(code);
    }
    const keys = Object.keys(argument).join(",");
    const args = Object.values(argument);
    const app = new Function(
      keys,
      //@ts-ignore
      "return " + globalThis.jsxLoader.compiler.compile(code)
    )(...args);
    return typeof app == "function" ? createElement(app) : app;
  }

  // 渲染元素
  render(
    app:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | null
      | undefined
  ) {
    return createRoot(this.container).render(app);
  }

  // 初始化后在document.body下创建一个div，挂载shadowRoot，并添加基础样式
  #createShadow() {
    const div = document.createElement("div");
    //div.innerHTML = "<cat-ui-page />";
    document.body.append(div);
    const shadow = div.attachShadow({ mode: "open" });
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("arco");
    shadow.append(container);
    const css = document.createElement("style");
    css.innerHTML = arcoCss as unknown as string;
    shadow.append(css);
    this.container = container;
    this.shadowRoot = shadow;
  }

  // 在shadowRoot下动态新增样式，类似GM_addStyle
  addStyle(styleString: string) {
    const css = document.createElement("style");
    css.innerHTML = styleString;
    this.shadowRoot.append(css);
  }

  // 暴露组件方法
  #assignMoudles() {
    Object.assign(this, { useState, useRef, useEffect });
    //@ts-ignore
    if (!window.CAT_UI.moudles) {
      //@ts-ignore
      window.CAT_UI.moudles = Object.assign(
        {},
        {
          useState,
          useRef,
          useEffect,
          Draggable,
          Affix,
          Alert,
          Anchor,
          AutoComplete,
          Avatar,
          BackTop,
          Badge,
          Breadcrumb,
          Button,
          Calendar,
          Card,
          Carousel,
          Cascader,
          Checkbox,
          Collapse,
          Comment,
          ConfigProvider,
          DatePicker,
          Descriptions,
          Divider,
          Drawer,
          Dropdown,
          Empty,
          Form,
          Grid,
          //@ts-ignore
          Icon: CAT_UI.Icon,
          Image,
          Input,
          InputNumber,
          InputTag,
          Layout,
          Link,
          List,
          Mentions,
          Menu,
          Modal,
          PageHeader,
          Pagination,
          Popconfirm,
          Popover,
          Portal,
          Progress,
          Radio,
          Rate,
          ResizeBox,
          Result,
          Select,
          Skeleton,
          Slider,
          Space,
          Spin,
          Statistic,
          Steps,
          Switch,
          Table,
          Tabs,
          Tag,
          TimePicker,
          Timeline,
          Tooltip,
          Transfer,
          Tree,
          TreeSelect,
          Trigger,
          Typography,
          Upload,
        }
      );
    }
  }

  // 特殊组件API优化
  #initProxy() {
    const that = this;
    // 指定Notification组件挂载位置
    this.Notification = new Proxy(Notification, {
      get(...args) {
        Notification.config({ getContainer: () => that.container });
        return Reflect.get(...args);
      },
    });
    // 指定Message组件挂载位置
    this.Message = new Proxy(Message, {
      get(...args) {
        Message.config({ getContainer: () => that.container });
        return Reflect.get(...args);
      },
    });
  }
}

export default AST;
