import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider as ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGlobalStyle } from "styled-components";
import theme from "../src/theme";
import { AuthProvider } from "../utils/user-context";
import { LoadingProvider } from "../utils/loading-context";
import NProgress from "nprogress";
import Router from "next/router";
import moment from "moment";

const GlobalStyle = createGlobalStyle`
  :root {
    height: 100vh;
    width: 100vw;

    font-size: 16px;

    & a {
      color: #000;
      text-decoration: none;
    }
  }

  body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;
  }

  #__next {
    height: 100%;
    width: 100%;
  }
`;

moment.locale("ko");

Router.events.on("routeChangeStart", url => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// cra의 app.js
// 페이지들이 변화할 때 layout을 유지
// 페이지를 navigating 할 때 state(상태) 유지
// componentDidCatch로 고객들의 에러 관리
// 페이지들에 추가데이터 사용가능 (예를 들어 전달되는 GraphQL queries)

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <LoadingProvider>
        <AuthProvider>
          <Head>
            <title>My page</title>
          </Head>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <Component {...pageProps} />
            <div id="modal"></div>
          </ThemeProvider>
        </AuthProvider>
      </LoadingProvider>
    );
  }
}
