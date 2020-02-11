import Layout from "../components/Layout";
import { useAuth } from "../utils/user-context";
import { useEffect, useState } from "react";
import { useLoaidng } from "../utils/loading-context";

const Index = () => {
  const auth = useAuth();
  const loading = useLoaidng();

  const [user, setUser] = useState(null);

  useEffect(() => {}, [auth.user]);

  return (
    <Layout title="메인" subTitle="어서오세요 선인 고등학교 입니다." showBanner={true}>
      <div>hello - {auth.user?.name}</div>
    </Layout>
  );
};

export default Index;
