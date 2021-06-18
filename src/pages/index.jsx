import { useState, useEffect, useClalback, useCallback } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";
import { PanelList } from "src/components/PanelList";
import { db } from "src/lib/firebase";
import { kata } from "src/lib/firebase";
import { auth } from "src/lib/firebase";
import { useRouter } from "next/router";

// ===========================
//todo
// 🔸ログインしたままページを再読み込みするとエラーになるため直す
// 　👆cookieとかに情報保持させる必要ありそう〜
// 🔸Twitter認証
// ===========================

// ユーザーがログアウトするとログインページへ飛ばす
const logoutPage = () => {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
      router.push("/login");
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

const Home = (props) => {
  const [todos, setTodos] = useState([{ id: "", todo: "" }]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  // 👇loginでuser情報を_appでグローバルに状態を持たせてるもの
  const { userInfo } = props;

  useEffect(() => {
    console.log(userInfo);
    const uid = db.collection("users").doc(userInfo?.uid);

    uid.onSnapshot((doc) => {
      console.log("ok document!");

      setName(doc.data()?.name);

      const getTodos = doc.data()?.todos;
      setTodos(
        getTodos.map((getTodo, index) => ({ id: index, todo: getTodo }))
      );
    });
  }, []);

  // ユーザー情報がなかったら自動的にログイン画面へ
  useEffect(() => {
    const userCheck = auth.onAuthStateChanged((user) => {
      !user && router.push("/login");
    });
    return () => userCheck();
  });

  // todo投稿
  const addTodos = useCallback(() => {
    console.log("call");
    const arrayTodos = db.collection("users").doc(userInfo?.uid);

    arrayTodos.update({
      todos: kata.FieldValue.arrayUnion(text),
    });
    setText("");
  }, [text]);

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <button
          className="h-11 w-28 bg-gray-500 text-white rounded-full"
          onClick={logoutPage}
        >
          ログアウト
        </button>

        <h1 className="pb-6 text-white text-6xl font-extrabold text-center">
          {`${name}'s`}
          <br />
          Todo List 😼
        </h1>

        <div className="pb-20">
          {todos.map((todo, index) => {
            return (
              <PanelList key={index} todo={todo.todo} uid={userInfo?.uid} />
            );
          })}
        </div>

        <SendPost text={text} setText={setText} addTodos={addTodos} />
      </div>
    </MainLayout>
  );
};
export default Home;
