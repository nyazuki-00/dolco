import { useState } from "react";
import { useRouter } from "next/router";
import { apiBaseUrl } from "@/libs/config";
import { useLoginUserContext } from "@/contexts/LoginUserContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoginUser } = useLoginUserContext();

  const handleLogin = async () => {
    const res = await fetch(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      const token = data.accessToken;

      localStorage.setItem("token", token);

      const meRes = await fetch(`${apiBaseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (meRes.ok) {
        const me = await meRes.json();
        setLoginUser(me);
      } else {
        setLoginUser({ name: "ゲスト", ownerCode: "guest" });
      }

      router.push(`/users/${data.ownerCode}/room`);
    } else {
      alert("ログイン失敗！");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">ログイン</h2>
        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
        >
          ログイン
        </button>
      </div>
    </div>
  );
}
