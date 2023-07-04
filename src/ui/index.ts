import CAT_UI from "./ui";
import AST from "./ast";
import React from "react";
import ReactDOM from "react-dom";
//@ts-ignore
import jsxLoaderFuc from "./lib/jsxLoader";

(<any>window).CAT_UI = Object.assign(AST, CAT_UI);
(<any>window).React = React;
(<any>window).ReactDOM = ReactDOM;
jsxLoaderFuc();
//@ts-ignore
jsxLoader.compiler.addUseStrict = false;
