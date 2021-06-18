import Link from "next/link";
import { MainLayout } from "src/layouts/MainLayout";
import { db } from "src/lib/firebase";
import { auth } from "src/lib/firebase";

const SignUp = (props) => {
  // 👇loginでuser情報を_appでグローバルに状態を持たせてるもの
  const { email, setEmail, password, setPassword, userInfo, getUserInfo } =
    props;

  const createUser = async () => {
    try {
      await auth
        // メールアドレスとパスワードを使用してユーザーの新規登録
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          // uidをもとにデータベースを作成;
          db.collection("users").doc(user.uid).set({
            name: "名前未設定", //デフォルトは未設定にしとく
            todos: [],
          });
          console.log("データ登録完了！");
        });
      getUserInfo();
    } catch (error) {
      console.log("error");
      alert(`${error.massage}：登録できません。`);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto flex flex-col items-center">
        <h1 className="text-white text-6xl font-extrabold text-center">
          新規登録 🐈
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

          <div className="pb-10 flex flex-col">
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
            onClick={createUser}
            className="h-11 w-full bg-gray-500 text-white rounded-full"
          >
            新規登録
          </button>
        </div>

        <p className="text-sm pb-10">もしくは</p>

        <button className="h-11 w-64 bg-blue-500 text-white rounded-full">
          Twitterから新規登録
        </button>

        <Link href="/login">
          <a className="mt-8 border-b border-black">ログイン画面へ &gt;</a>
        </Link>
      </div>
    </MainLayout>
  );
};

export default SignUp;
