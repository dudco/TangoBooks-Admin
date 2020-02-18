import styled from "styled-components";
import { AdminMenu } from "./Menu";
import Header from "./Header";
import { NextPage } from "next";
import { Component } from "react";
import { useAuth } from "../utils/user-context";
import { useLoaidng } from "../utils/loading-context";

const Wrapper = styled.div`
  display: flex;

  height: 100%;
  & > main {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 302px;
    overflow: hidden;
  }
`;

const ChildWrapper = styled.div`
  padding: 30px 50px 30px 50px;
  overflow: scroll;
  flex: 1;
  & > * {
    height: 100%;
    width: 100%;
  }
`;

interface LayoutProps {
  children?: React.ReactElement;
}

const Layout: NextPage<LayoutProps> = (props: LayoutProps) => {
  const auth = useAuth();
  const loading = useLoaidng();

  return (
    <Wrapper>
      <AdminMenu />
      <main>
        <Header />
        <ChildWrapper>{loading.isLoading ? <div>로딩중입니다 ...</div> : props.children}</ChildWrapper>
      </main>
    </Wrapper>
  );
};

export const withLayout = Page => {
  return class extends Component<{ pageProps: any; data: any; getData: any }> {
    static async getInitialProps(ctx) {
      let pageProps = {};

      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      return { pageProps };
    }

    render() {
      return (
        <Layout>
          <Page data={this.props.data} getData={this.props.getData} {...this.props.pageProps} />
        </Layout>
      );
    }
  };
};

export default Layout;
