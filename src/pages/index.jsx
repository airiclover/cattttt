import { useState, useEffect, useCallback, useContext } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";
import { PanelList } from "src/components/PanelList";
import { db } from "src/lib/firebase";
import { auth } from "src/lib/firebase";
import firebase from "src/lib/firebase";
import { useRouter } from "next/router";

// ===========================
//todo
// 🔸todo送信・削除できるようコード修正する
// 🔸ログインしたままページを再読み込みするとエラーになるため直す
// 🔸新規会員画面作成
// 🔸新規会員作成したらAuthのuidをfirestoreのIDで登録、

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
    auth.onAuthStateChanged((user) => {
      // User is signed in.
      // 👇【todo】Authのuidでユーザーごとのリンクへ飛ばすよう変える
      user ? setGetUser(user.uid) : router.push("/login");
    });
  }, []);

  useEffect(() => {
    const uid = db.collection("users").doc(userInfo.uid);

    uid.get().then((doc) => {
      if (doc.exists) {
        console.log("ok document!");
        setName(doc.data().name);
        const getTodos = doc.data().todos;
        setTodos(
          getTodos.map((getTodo, index) => ({ id: index, todo: getTodo }))
        );
      } else {
        console.log("No such document!");
      }
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
    // db.collection("todos").add({ todos: text });
    // setText("");
  };

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <button onClick={logoutPage}>ログアウト</button>

        <h1 className="pb-6 text-white text-6xl font-extrabold text-center">
          {`${name}'s`}
          <br />
          Todo List 😼
        </h1>

        <div className="pb-20">
          {todos.map((todo) => {
            return <PanelList key={todo.id} todo={todo.todo} />;
          })}
        </div>

        <SendPost text={text} setText={setText} addTodos={addTodos} />
      </div>
    </MainLayout>
  );
};
export default Home;
