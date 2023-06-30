import CAT_UI from "./ui";
import DOG_UI from "./DOG_UI";
import React from "react";
import ReactDOM from "react-dom";
//@ts-ignore
import jsxLoaderFuc from "./lib/jsxLoader";

(<any>window).CAT_UI = CAT_UI;
(<any>window).DOG_UI = DOG_UI;
(<any>window).React = React;
(<any>window).ReactDOM = ReactDOM;
jsxLoaderFuc();
//@ts-ignore
jsxLoader.compiler.addUseStrict = false;
