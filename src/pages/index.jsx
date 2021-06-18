import { useState, useEffect, useCallback, useContext } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";
import { PanelList } from "src/components/PanelList";
import { db } from "src/lib/firebase";
import { kata } from "src/lib/firebase";
import firebase from "src/lib/firebase";
import { auth } from "src/lib/firebase";
import { useRouter } from "next/router";
import { useCheckLogin } from "src/pages/login";

// ===========================
//todo
// 🔸ログインしたままページを再読み込みするとエラーになるため直す
// 🔸Twitter認証
// ===========================

const Home = (props) => {
  const [getUser, setGetUser] = useState(null);
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

      setName(doc.data().name);

      const getTodos = doc.data().todos;
      setTodos(
        getTodos.map((getTodo, index) => ({ id: index, todo: getTodo }))
      );
      console.log(doc.data().todos);
    });
  }, []);

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

  const addTodos = () => {
    const arrayTodos = db.collection("users").doc(userInfo?.uid);

    arrayTodos.update({
      todos: kata.FieldValue.arrayUnion(text),
    });
    setText("");
  };

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
