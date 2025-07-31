import { useState } from "react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const router = useRouter();
  const [ownerCode, setOwnerCode] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ownerCode, email, name, password }),
    });

    if (res.ok) {
      alert("登録完了！");
      router.push("/login");
    } else {
      alert("登録に失敗しました！");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">新規登録</h2>
        <input
          type="ownerCode"
          placeholder="オーナーコード"
          className="w-full mb-3 p-2 border rounded"
          value={ownerCode}
          onChange={(e) => setOwnerCode(e.target.value)}
        />
        <input
          type="email"
          placeholder="メールアドレス"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="ユーザー名"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          登録
        </button>
      </div>
    </div>
  );
}
