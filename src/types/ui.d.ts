// ui.d.ts

import {
  TypographyProps,
  InputProps,
  ButtonProps,
  CheckboxProps,
  SelectProps,
  MessageProps,
  SelectOptionProps,
} from "@arco-design/web-react";

interface MutableRefObject<T> {
  current: T;
}

declare type UIPageOptions = {
  style?: string;
  render: () => JSX.Element[] | JSX.Element;
};

declare class UIPage extends HTMLElement {
  static render(_this: UIPage): void;
  options: UIPageOptions;
  constructor();
}

declare type UIPlanOptions = UIPageOptions & {
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

declare class UIPlan extends HTMLElement {
  options: UIPlanOptions;
  static DefaultHeader(props: {
    title: string;
    plan: MutableRefObject<HTMLElement | undefined>;
  }): JSX.Element;
  static DefaultFooter(child?: JSX.Element): JSX.Element;
  onDraggableStop(callback: (event: { x: number; y: number }) => void);
}

declare namespace CAT_UI {
  function create(options: UIPageOptions): void;
  function createPlan(options: UIPlanOptions): void;

  function createElement(
    type: string,
    props?: any,
    ...children: React.ReactNode[]
  );

  function useState(data?: any): [any, (data: any) => void];

  function Text(text: string, props?: TypographyProps): JSX.Element;
  function Input(props?: InputProps): JSX.Element;
  function Button(text: string, props?: ButtonProps): JSX.Element;
  function Checkbox(text: string, props?: CheckboxProps): JSX.Element;
  type TSelect = (
    options: JSX.Element[],
    props?: SelectProps
  ) => JSX.Element & {
    Option: (text: string, props?: SelectOptionProps) => JSX.Element;
  };
  const Select: TSelect;
  function Space(element: JSX.Element, props?: SpaceProps);

  namespace Message {
    function info(config: MessageProps | string);
    function success(config: MessageProps | string);
    function warning(config: MessageProps | string);
    function error(config: MessageProps | string);
    function normal(config: MessageProps | string);
  }
}
