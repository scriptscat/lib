import CAT_UI from "./ui";
import AST from "./ast";
import React from "react";
import ReactDOM from "react-dom";
import jsxLoaderFuc from "./lib/jsxLoader";

// 整合AST方法和函数式方法
(<any>window).CAT_UI = CAT_UI;
(<any>window).CAT_UI_AST=AST;
(<any>window).React = React;
(<any>window).ReactDOM = ReactDOM;

// 加载AST方法编译库jsxLoader
jsxLoaderFuc();
(<any>window).jsxLoader.compiler.addUseStrict = false;

// 函数式初始化Popup相关组件
CAT_UI.createPopup();
