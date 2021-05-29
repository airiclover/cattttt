import { useState, useEffect } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";
import { db } from "src/lib/firebase";
import firebase from "src/lib/firebase";
import Panels from "src/components/Panels";

export default function Home() {
  const [panels, setPanels] = useState([{ id: "", title: "" }]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unSub = db.collection("panels").onSnapshot((snapshot) => {
      setPanels(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const addPanel = () => {
    db.collection("panels").add({ title: text });
    setText("");
  };

  return (
    <MainLayout>
      <h1 className="text-white text-6xl font-extrabold">Hello world!</h1>

      <Panels panels={panels} />

      <SendPost text={text} setText={setText} addPanel={addPanel} />
    </MainLayout>
  );
}
