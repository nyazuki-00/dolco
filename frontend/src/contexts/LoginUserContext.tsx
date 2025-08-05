import { createContext, useContext, useEffect, useState } from "react";
import { apiBaseUrl } from "@/libs/config";

type LoginUser = { name: string; ownerCode: string; };

const guestUser: LoginUser = {
  name: "ゲスト",
  ownerCode: "guest",
};

const LoginUserContext = createContext<{
  loginUser: LoginUser;
  setLoginUser: (user: LoginUser) => void;
}>({
  loginUser: guestUser,
  setLoginUser: () => {},
});

export const LoginUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginUser, setLoginUser] = useState<LoginUser>(guestUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${apiBaseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setLoginUser(data);
        } else {
          setLoginUser(guestUser);
        }
      })
      .catch(() => {
        setLoginUser(guestUser);
      });
  }, []);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};

export const useLoginUserContext = () => useContext(LoginUserContext);
