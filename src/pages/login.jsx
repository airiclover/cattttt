import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "src/layouts/MainLayout";
import { auth } from "src/lib/firebase";

// _appで状態を持たせるためexport
export const useGetUserInfo = () => {
  //🔶ユーザー🔶
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  const getUserInfo = async () => {
    try {
      await auth
        // メールアドレスとパスワードを使用してユーザーのログインを行う
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUserInfo(user);
        });
      router.push("/");
    } catch (error) {
      alert(
        `${error.massage}：ログインできません。正しい情報を入力してください。`
      );
    }
  };

  return { email, setEmail, password, setPassword, userInfo, getUserInfo };
};

// _appで状態を持たせるためexport
export const useCheckLogin = () => {
  const router = useRouter();
  // 現在ログインしているユーザーだった場合は、自動的にtopPageへ飛ばす
  // 👇一旦offに
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => user && router.push("/"));
  // }, []);
};

export const Login = (props) => {
  const { email, setEmail, password, setPassword, userInfo, getUserInfo } =
    props;
  console.log(password);

  return (
    <MainLayout>
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-white text-6xl font-extrabold text-center">
          Login 🐾
        </h1>

        <div className="w-64 pt-14 pb-10">
          <div className="mb-4 p-4 bg-gray-200 text-xs">
            <p>テストログイン</p>
            <p>【📧】login@test.com</p>
            <p>【🗝】test123</p>
          </div>
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
            onClick={getUserInfo}
            className="h-11 w-full bg-gray-500 text-white rounded-full"
          >
            ログイン
          </button>
        </div>

        <p className="text-sm pb-10">もしくは</p>

        <button className="h-11 w-64 bg-blue-500 text-white rounded-full">
          Twitterからログイン
        </button>

        <Link href="/signup">
          <a className="pt-8 border-b border-black">新規登録画面へ &gt;</a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default Login;
