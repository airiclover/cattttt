import { useState, useEffect, useCallback } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";
import { db } from "src/lib/firebase";
import firebase from "src/lib/firebase";
import { PanelList } from "src/components/PanelList";

const Home = () => {
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
      <h1 className="pb-6 text-white text-6xl font-extrabold">Todo List😼</h1>

      <div className="pb-20">
        {panels.map((panel) => {
          return <PanelList key={panel.id} id={panel.id} title={panel.title} />;
        })}
      </div>

      <SendPost text={text} setText={setText} addPanel={addPanel} />
    </MainLayout>
  );
};

export default Home;
