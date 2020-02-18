import React from "react";
import { useRouter } from "next/router";
import nextCookie from "next-cookies";
import Cookies from "js-cookie";
import AuthService from "../api/services/AuthService";

const AuthContext = React.createContext({ user: undefined, login: undefined, logout: undefined });

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    // 링크가 바뀔때마다 유저 로그인 상태 확인
    const cookies = Cookies.get();

    if (user === null) {
      if (cookies["user"]) {
        const u = JSON.parse(cookies["user"]);
        if (u) {
          setUser(u);
        } else {
          router.replace("/login");
        }
      } else if (router.pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [router.pathname]);

  const login = async (user_id: string, user_pw: string) => {
    if (user_id === "root" && user_pw === "root") {
      setUser({ name: "root" });
      Cookies.set("user", JSON.stringify({ name: "root" }), { expires: 1 });
      router.push("/?q=t");
    } else {
      alert("로그인에 실패했습니다.");
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
