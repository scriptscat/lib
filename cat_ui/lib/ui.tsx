import React, { useState, useRef, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import UIPage, { UIPageOptions } from "./page";
import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  Descriptions,
  DescriptionsProps,
  Divider,
  DividerProps,
  Drawer,
  DrawerProps,
  Empty,
  EmptyProps,
  Input,
  InputProps,
  Menu,
  MenuItemGroupProps,
  MenuItemProps,
  MenuProps,
  MenuSubMenuProps,
  Modal,
  ModalProps,
  Result,
  ResultProps,
  Select,
  SelectProps,
  Space,
  SpaceProps,
  Table,
  TableProps,
  Tooltip,
  TooltipProps,
  Trigger,
  TriggerProps,
} from "@arco-design/web-react";
import { InputSearchProps } from "@arco-design/web-react/es/Input";
import UIPanel, { UIPanelOptions } from "./panel";
import * as Icon from "@arco-design/web-react/icon";
import "./arco.css?inline";
import { ImgHTMLAttributes } from "react";
import Typography, {
  TypographyProps,
  TypographyTextProps,
  TypographyTitleProps,
  TypographyParagraphProps,
} from "@arco-design/web-react/es/Typography";
import Router from "./component/route";
import Popup from "./component/Popup";
import Draggable, { DraggableProps } from "react-draggable";
import UserConfigPanel, {
  UserConfigPanelProps,
} from "./component/UserConfigPanel";
import { Resizable, ResizableProps } from "react-resizable";
import { OptionProps } from "@arco-design/web-react/es/Select/interface";

const pageElName = "cat-ui-page";
window.customElements.define(pageElName, UIPage);
const planElName = "cat-ui-plan";
window.customElements.define(planElName, UIPanel);
const popupElName = "cat-ui-popup";
customElements.define(popupElName, Popup);

const CAT_UI: { [key: string]: any } = {
  tabIndex: 1,
  zIndex: 10000,
  create(options: UIPageOptions) {
    // @ts-ignore
    UIPage.options = options;

    const div = document.createElement("div");

    div.innerHTML = "<" + pageElName + " />";

    document.body.append(div);
    return div;
  },
  createPopup() {
    const div = document.createElement("div");

    div.innerHTML = "<" + popupElName + " />";

    // @run-at document.start 时 document.body可能未初始化
    (document.body || document.firstElementChild).append(div);
    return div;
  },
  createPanel(options: UIPanelOptions) {
    // @ts-ignore
    UIPanel.options = options;

    const div = document.createElement("div");

    div.innerHTML = "<" + planElName + " />";

    document.body.append(div);
    return div;
  },
  createElement(type: string, props?: any, ...children: React.ReactNode[]) {
    return React.createElement(type, props, children);
  },
  el(type: string, props?: any, ...children: React.ReactNode[]) {
    return React.createElement(type, props, children);
  },
  useEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(effect, deps);
  },
  useState<T>(data?: T) {
    return useState(data);
  },
  useRef<T>(data?: T) {
    return useRef(data);
  },
  Router: Router,
  Draggable(element: ReactNode, props: DraggableProps) {
    return <Draggable {...props}>{element}</Draggable>;
  },
  Resizable(element: ReactNode, props: ResizableProps) {
    return <Resizable {...props}>{element}</Resizable>;
  },
  Empty(props?: EmptyProps) {
    return <Empty {...props} />;
  },
  //图标 动态加载
  Icon: {},
  Typography(text: string, props?: TypographyProps) {
    return <Typography {...props}>{text}</Typography>;
  },
  Input(props?: InputProps) {
    return <Input {...props} />;
  },
  Button(text: string, props?: ButtonProps) {
    return <Button {...props}>{text}</Button>;
  },
  Checkbox(text: string, props?: CheckboxProps) {
    return <Checkbox {...props}>{text}</Checkbox>;
  },
  Select(options: JSX.Element[], props?: SelectProps) {
    return <Select {...props}>{options}</Select>;
  },
  Space(element: ReactNode, props?: SpaceProps) {
    return <Space {...props}>{element}</Space>;
  },
  Descriptions(props: DescriptionsProps) {
    return <Descriptions {...props} />;
  },
  Divider(children?: ReactNode, props?: DividerProps) {
    return <Divider {...props}>{children}</Divider>;
  },
  Drawer(children: ReactNode, props?: DrawerProps) {
    return <Drawer {...props}>{children}</Drawer>;
  },
  Modal(children?: ReactNode, props?: ModalProps) {
    return <Modal {...props}>{children}</Modal>;
  },
  Result(props: ResultProps & { children?: ReactNode }) {
    return <Result {...props} />;
  },
  Menu(children: ReactNode, props?: MenuProps) {
    return <Menu {...props}>{children}</Menu>;
  },
  Table(props: TableProps) {
    return <Table {...props} />;
  },
  Tooltip(children: ReactNode, props?: TooltipProps) {
    return <Tooltip {...props}>{children}</Tooltip>;
  },
  Trigger(children: ReactNode, props?: TriggerProps) {
    return <Trigger {...props}>{children}</Trigger>;
  },
  UserConfigPanel(props: UserConfigPanelProps) {
    return <UserConfigPanel {...props} />;
  },
  React,
  ReactDOM: { ...ReactDOM, renderToString, renderToStaticMarkup },
};

// 动态引入所有图标
Object.keys(Icon).forEach((icon) => {
  if (icon == "IconProps") {
    return;
  }

  const Item = Icon[
    icon as keyof typeof Icon
  ] as React.ForwardRefExoticComponent<
    Icon.IconProps & React.RefAttributes<unknown>
  >;

  CAT_UI.Icon[icon] = (props: Icon.IconProps) => {
    return <Item {...props}></Item>;
  };
});

CAT_UI.Menu.Item = (children: ReactNode, props: MenuItemProps) => {
  return <Menu.Item {...props}>{children}</Menu.Item>;
};

CAT_UI.Menu.ItemGroup = (children: ReactNode, props?: MenuItemGroupProps) => {
  return <Menu.ItemGroup {...props}>{children}</Menu.ItemGroup>;
};

CAT_UI.Menu.SubMenu = (children: ReactNode, props: MenuSubMenuProps) => {
  return <Menu.SubMenu {...props}>{children}</Menu.SubMenu>;
};

CAT_UI.Typography.Text = (text: string, props: TypographyTextProps) => {
  return <Typography.Text {...props}>{text}</Typography.Text>;
};

CAT_UI.Typography.Title = (text: string, props: TypographyTitleProps) => {
  return <Typography.Title {...props}>{text}</Typography.Title>;
};

CAT_UI.Typography.Paragraph = (
  text: string,
  props: TypographyParagraphProps
) => {
  return <Typography.Paragraph {...props}>{text}</Typography.Paragraph>;
};

// 简化别名
CAT_UI.Text = CAT_UI.Typography.Text;

CAT_UI.Icon.ScriptCat = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      {...props}
      src="data:image/png;base64,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"
    />
  );
};

CAT_UI.Select.Option = function (text: string, props: OptionProps) {
  return <Select.Option {...props}>{text}</Select.Option>;
};

CAT_UI.Input.Search = (props?: InputSearchProps) => {
  return <Input.Search {...props} />;
};

export default CAT_UI;
