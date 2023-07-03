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
  CElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import Draggable from "react-draggable";

class DOG_UI {
  shadowroot!: ShadowRoot;
  container!: HTMLDivElement;
  Notification!: typeof Notification;
  Message!: typeof Message;
  static moudles: any;

  constructor() {
    this.#createShadow();
    this.#initProxy();
    this.#assignMoudles();
  }

  createApp(code: string, args = {}) {
    const keys = Object.keys(args).join(",");
    const app = new Function(
      keys,
      //@ts-ignore
      "return " + globalThis.jsxLoader.compiler.compile(code)
    )(...Object.values(args));
    return typeof app == "function" ? createElement(app) : app;
  }

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
    this.shadowroot = shadow;
  }

  addStyle(styleString: string) {
    const css = document.createElement("style");
    css.innerHTML = styleString;
    this.shadowroot.append(css);
  }

  #assignMoudles() {
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

  #initProxy() {
    const that = this;
    this.Notification = new Proxy(Notification, {
      get(...args) {
        Notification.config({ getContainer: () => that.container });
        return Reflect.get(...args);
      },
    });
    this.Message = new Proxy(Message, {
      get(...args) {
        Message.config({ getContainer: () => that.container });
        return Reflect.get(...args);
      },
    });
  }
}

export default DOG_UI;
