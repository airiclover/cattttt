import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainLayout } from "src/layouts/MainLayout";
import { auth } from "src/lib/firebase";

// _appで状態を持たせるためexport
export const useGetUserInfo = () => {
  //🔶ユーザー🔶
  const [email, setEmail] = useState("airi@test.com");
  const [password, setPassword] = useState("airi000");

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

  return (
    <MainLayout>
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-white text-6xl font-extrabold text-center">
          Login 🐾
        </h1>

        <div className="w-64 pt-16 pb-10">
          <div className="text-xs">
            <p>ユーザー1：airi@test.com、airi000</p>
            <p>ユーザー2：login@test.com、test123</p>
            <p>ユーザー3：tameshi@tamehi.com、123456</p>
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
      </div>
    </MainLayout>
  );
};

export default Login;
