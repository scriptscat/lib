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
import { messageFuncType } from "@arco-design/web-react/es/Message/useMessage";
import { notificationFuncType } from "@arco-design/web-react/es/Notification/useNotification";

class AST {
  shadowRoot!: ShadowRoot;
  container!: HTMLDivElement;
  static moudles: any;
  Notification!: ProxyHandler<object> | notificationFuncType;
  Message!: ProxyHandler<object> | messageFuncType;

  constructor(parentNode: HTMLElement) {
    this.#createShadow(parentNode);
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
      "return " + window.jsxLoader.compiler.compile(code)
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
    const App = createElement(
      ConfigProvider,
      { getPopupContainer: () => this.container },
      app
    );
    return createRoot(this.container).render(App);
  }

  // 初始化后在document.body下创建一个div，挂载shadowRoot，并添加基础样式
  #createShadow(parentNode = document.body) {
    const div = document.createElement("div");
    //div.innerHTML = "<cat-ui-page />";
    parentNode.append(div);
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
    if (!window.CAT_UI.moudles) {
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
          Icon: window.CAT_UI.Icon,
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
        }
      );
    }
  }

  // 特殊组件API优化
  #initProxy() {
    this.Notification = new Proxy(
      {},
      {
        get: (_, props) => {
          const [notification, contextHolder] = Notification.useNotification();
          hydrateRoot(this.container, contextHolder);
          this.Notification = notification;
          return new Proxy(() => {}, {
            apply: (_, ...args) => {
              // React 18 官方推荐用setTimeout回调 https://github.com/reactwg/react-18/discussions/5#discussioncomment-798304
              setTimeout(() =>
                Reflect.apply(
                  notification[props as keyof notificationFuncType] as Function,
                  ...args
                )
              );
            },
          });
        },
      }
    );
    this.Message = new Proxy(
      {},
      {
        get: (_, props) => {
          const [message, contextHolder] = Message.useMessage();
          hydrateRoot(this.container, contextHolder);
          this.Message = message;
          return new Proxy(() => {}, {
            apply: (_, ...args) => {
              setTimeout(() =>
                Reflect.apply(
                  message[props as keyof messageFuncType] as Function,
                  ...args
                )
              );
            },
          });
        },
      }
    );
  }
}

export default AST;
