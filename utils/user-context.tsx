import React from "react";
import { useRouter } from "next/router";
import nextCookie from "next-cookies";
import Cookies from "js-cookie";

const AuthContext = React.createContext({ user: undefined, login: undefined, logout: undefined });

function AuthProvider(props) {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    // 링크가 바뀔때마다 유저 로그인 상태 확인
    const cookies = Cookies.get();

    if (cookies["user"]) {
      setUser(JSON.parse(cookies["user"]));
      if (router.pathname === "/login") router.replace("/");
    } else if (router.pathname !== "/login") {
      router.replace("/login");
    }
    // if (cookies["user"]) {
    //   setUser(JSON.parse(cookies["user"]));
    //   if (router.pathname === "/login") router.replace("/");
    // } else if (router.pathname !== "/login") {
    //   router.replace("/login");
    // }
  }, [router.pathname]);

  const login = async (id: string, pw: string) => {
    // Please Set Login Function
    const user = { name: id, type: id === "root" || id === "관리자" ? "Admin" : "Department" };
    setUser(user);
    Cookies.set("user", JSON.stringify(user), { expires: 1 });
    router.push("/");
    // const res = await AuthService.login(id, pw);
    // if (res.status === 200) {
    //   setUser(res.data.data);
    //   Cookies.set("user", JSON.stringify(res.data.data), { expires: 1 });
    //   // login(JSON.stringify(res.data.data));
    //   router.push("/");
    // } else {
    //   alert("로그인에 실패했습니다.");
    // }
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
