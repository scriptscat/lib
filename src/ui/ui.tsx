import React, { useEffect, useRef, useState } from "react";
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
  Typography,
  TypographyProps,
} from "@arco-design/web-react";
import UIPlan, { UIPlanOptions } from "./plan";
import Message from "./component/message";

const pageElName = "cat-ui-page";
window.customElements.define(pageElName, UIPage);
const planElName = "cat-ui-plan";
window.customElements.define(planElName, UIPlan);

const CAT_UI = {
  create(options: UIPageOptions) {
    // @ts-ignore
    UIPage.options = options;

    let div = document.createElement("div");

    div.innerHTML = "<" + pageElName + " />";

    document.body.append(div);
  },
  createPlan(options: UIPlanOptions) {
    // @ts-ignore
    UIPlan.options = options;

    let div = document.createElement("div");

    div.innerHTML = "<" + planElName + " />";

    document.body.append(div);
  },
  UIPlan,
  useState(data?: any) {
    return useState(data);
  },

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
  Message: Message,
};

// @ts-ignore
CAT_UI.Select.Option = function (text: string, props?: SelectOptionProps) {
  // @ts-ignore
  return <Select.Option {...props}>{text}</Select.Option>;
};

export default CAT_UI;
