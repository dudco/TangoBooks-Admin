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
        AuthService.regen(JSON.parse(cookies["user"]).token).then(res => {
          if (res.status === 200) {
            setUser({ ...res.data.user, token: res.data.token });

            const date = new Date();
            date.setTime(date.getTime() + (1 / 2.4) * 24 * 60 * 60 * 1000);

            Cookies.set("user", JSON.stringify({ token: res.data.token, type: res.data.user.type }), { expires: date });
            if (router.pathname === "/login") router.replace("/");
          } else if (router.pathname !== "/login") {
            router.replace("/login");
          }
        });
      } else if (router.pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [router.pathname]);

  const login = async (user_id: string, user_pw: string) => {
    // Please Set Login Function
    const res = await AuthService.login({ user_id, user_pw });
    if (res.status === 200) {
      setUser({ ...res.data.user, token: res.data.token });

      const date = new Date();
      date.setTime(date.getTime() + (1 / 2.4) * 24 * 60 * 60 * 1000);

      console.log(res.data);
      Cookies.set("user", JSON.stringify({ token: res.data.token, type: res.data.user.type }), { expires: date });
      router.push("/");
    } else {
      alert("로그인에 실패했습니다.");
    }
    // const user = { name: id, type: id === "root" || id === "관리자" ? "Admin" : "Department" };
    // setUser(user);
    // Cookies.set("user", JSON.stringify(user), { expires: 1 });
    // router.push("/");
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
