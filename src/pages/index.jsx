import { useState, useEffect, useClalback, useCallback } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";
import { PanelList } from "src/components/PanelList";
import firebase, { db, auth } from "src/lib/firebase";
import { useRouter } from "next/router";

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
  const [nameButton, setNameButton] = useState(false);
  const [nameChange, setNameChange] = useState("");
  const router = useRouter();
  // 👇loginでuser情報を_appでグローバルに状態を持たせてるもの
  const { userInfo } = props;
  const uid = db.collection("users").doc(userInfo?.uid);

  useEffect(() => {
    uid.onSnapshot((doc) => {
      setName(doc.data()?.name);

      const getTodos = doc.data()?.todos;
      setTodos(
        getTodos.map((getTodo, index) => ({ id: index, todo: getTodo }))
      );
    });

    return () => {
      localStorage.removeItem("key");
    };
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
    const arrayTodos = db.collection("users").doc(userInfo?.uid);

    arrayTodos.update({
      todos: firebase.firestore.FieldValue.arrayUnion(text),
    });
    setText("");
  }, [text]);

  //名前変更画面表示
  const setNameInput = useCallback(() => {
    setNameButton((nameChange) => !nameChange);
  });

  //名前変更
  const handleNameChange = useCallback(() => {
    return uid.update({
      name: nameChange,
    });
  });

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <div className="flex items-center">
          <button
            className="h-11 w-28 bg-gray-500 text-white rounded-full"
            onClick={logoutPage}
          >
            ログアウト
          </button>
          <button
            className="mx-2 h-11 w-28 bg-pink-400 text-white rounded-full"
            onClick={setNameInput}
          >
            名前の変更
          </button>
          {nameButton ? (
            <div className="flex">
              <input
                name="name"
                value={nameChange}
                onChange={(e) => {
                  setNameChange(e.target.value);
                }}
                className="h-11 w-28 text-sm rounded-l-full"
              />
              <button
                disabled={!nameChange}
                onClick={handleNameChange}
                className="bg-gray-200 px-3 rounded-r-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <h1 className="py-6 text-white text-6xl font-extrabold text-center">
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
