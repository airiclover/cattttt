import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "src/layouts/MainLayout";
import { auth } from "src/lib/firebase";

const Login = () => {
  const [email, setEmail] = useState("login@test.com");
  const [password, setPassword] = useState("test123");

  const router = useRouter();

  return (
    <MainLayout>
      <div className="max-w-screen-sm mx-auto flex flex-col items-center">
        <h1 className="text-white text-6xl font-extrabold text-center">
          Login 🐾
        </h1>

        <div className="w-64 pt-16 pb-10">
          <div className="pb-6 flex flex-col">
            <label>email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="h-10 p-2 border text-sm rounded-lg"
            />
          </div>

          <div className="pb-8 flex flex-col">
            <label>password</label>
            <input
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="h-10 p-2 border text-sm rounded-lg"
            />
          </div>
          <button
            onClick={async () => {
              try {
                await auth
                  .signInWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                  });
                // 👇【todo】Authのuidでユーザーごとのリンクへ飛ばすよう変える
                // 👇【todo】DRでユーザーごとのページ作成する
                router.push("/");
              } catch (error) {
                alert(`${error.massage}：正しい情報を入力してください。`);
              }
            }}
            className="h-11 w-full bg-gray-500 text-white rounded-full"
          >
            ログイン
          </button>
        </div>

        <p className="text-sm pb-10">もしくは</p>

        <button className="h-11 w-64 bg-blue-500 text-white rounded-full">
          Twitterからログイン
        </button>
      </div>
    </MainLayout>
  );
};

export default Login;
