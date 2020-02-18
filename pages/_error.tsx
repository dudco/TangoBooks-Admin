import React from "react";
import Layout from "../components/Layout";

interface ErrorProps {
  statusCode: number;
}

class Error extends React.Component<ErrorProps> {
  static getInitialProps(ctx) {
    const statusCode = ctx.res ? ctx.res.statusCode : ctx.err ? ctx.err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Layout>
        <div>페이지를 찾을 수 없습니다.</div>
      </Layout>
    );
  }
}

export default Error;
