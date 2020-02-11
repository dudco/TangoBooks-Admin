import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider as ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createGlobalStyle } from "styled-components";
import theme from "../src/theme";
import { AuthProvider } from "../utils/user-context";
import { LoadingProvider } from "../utils/loading-context";
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

export default class MyApp extends App {
  componentDidMount() {}

  render() {
    const { Component, pageProps } = this.props;

    return (
      <LoadingProvider>
        <AuthProvider>
          <Container>
            <Head>
              <title>My page</title>
            </Head>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <CssBaseline />
              <Component {...pageProps} />
              <div id="modal"></div>
            </ThemeProvider>
          </Container>
        </AuthProvider>
      </LoadingProvider>
    );
  }
}
