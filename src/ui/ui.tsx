import React, { useState } from "react";
import UIPage, { UIPageOptions } from "./page";
import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  Input,
  InputProps,
  Select,
  SelectOptionProps,
  SelectProps,
  Space,
  SpaceProps,
  Typography,
  TypographyProps,
} from "@arco-design/web-react";
import UIPanel, { UIPanelOptions } from "./panel";
import * as Icon from "@arco-design/web-react/icon";
import Message from "./component/message";
// @ts-ignore
import arcoCss from "./arco.css";

const pageElName = "cat-ui-page";
window.customElements.define(pageElName, UIPage);
const planElName = "cat-ui-plan";
window.customElements.define(planElName, UIPanel);

const CAT_UI: { [key: string]: any } = {
  create(options: UIPageOptions) {
    // @ts-ignore
    UIPage.options = options;

    let div = document.createElement("div");

    div.innerHTML = "<" + pageElName + " />";

    document.body.append(div);
    return div;
  },
  createPanel(options: UIPanelOptions) {
    // @ts-ignore
    UIPanel.options = options;

    let div = document.createElement("div");

    div.innerHTML = "<" + planElName + " />";

    document.body.append(div);
    return div;
  },
  createElement(type: string, props?: any, ...children: React.ReactNode[]) {
    return React.createElement(type, props, children);
  },
  useState(data?: any) {
    return useState(data);
  },
  //图标 动态加载
  Icon: {},
  Text(text: string, props?: TypographyProps) {
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
    if (!props) {
      props = {};
    }
    if (!props.triggerProps) {
      props.triggerProps = {};
    }
    if (!props.triggerProps.getPopupContainer) {
      props.triggerProps.getPopupContainer = (node) => {
        return node;
      };
    }
    return <Select {...props}>{options}</Select>;
  },
  Space(element: JSX.Element[] | JSX.Element, props?: SpaceProps) {
    return <Space {...props}>{element}</Space>;
  },
  Message: Message,
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

CAT_UI.Select.Option = function (text: string, props?: SelectOptionProps) {
  // @ts-ignore
  return <Select.Option {...props}>{text}</Select.Option>;
};

export default CAT_UI;
