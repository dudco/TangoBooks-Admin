import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from "next/document";
import { ServerStyleSheet as StyledServerStyleSheet } from "styled-components";
import { ServerStyleSheets as MaterialServerStyleSheet } from "@material-ui/styles";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new StyledServerStyleSheet();
    const sheet2 = new MaterialServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet2.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  public render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
