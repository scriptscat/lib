import React, { useState } from "react";
import UIPage, { UIPageOptions } from "./page";
import { Button, Input, Typography } from "@arco-design/web-react";
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
  Text(child: string) {
    return <Typography>{child}</Typography>;
  },
  Input(
    value: string | ((val: string) => void),
    onChange?: (val: string) => void
  ) {
    if (typeof value === "function") {
      return (
        <Input
          onChange={(val) => {
            value(val);
          }}
        />
      );
    }
    return (
      <Input
        value={value}
        onChange={(val) => {
          onChange && onChange(val);
        }}
      />
    );
  },
  Button(child: string, onClick: () => void) {
    return (
      <Button onClick={onClick} type="primary">
        {child}
      </Button>
    );
  },
  Message: Message,
};

export default CAT_UI;
