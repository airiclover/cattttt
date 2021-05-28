import { useState } from "react";
import { SendPost } from "src/components/SendPost";
import { MainLayout } from "src/layouts/MainLayout";

export default function Home() {
  const [text, setText] = useState("");
  const [panel, setPanel] = useState("");

  return (
    <MainLayout>
      <h1 className="text-white text-6xl font-extrabold">Hello world!</h1>

      <div className="my-4 p-4 bg-white bg-opacity-60 rounded-lg">
        {/* <div className="bg-white bg-opacity-50"> */}
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eaque
          necessitatibus molestias ipsam, possimus maiores. Incidunt culpa,
          similique quo placeat perspiciatis molestiae autem asperiores
          voluptatem rem, ipsum, quisquam tempore fuga.
        </h1>
      </div>

      <SendPost text={text} setText={setText} />
    </MainLayout>
  );
}
