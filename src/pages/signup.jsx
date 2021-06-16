import { useState } from "react";
import { MainLayout } from "src/layouts/MainLayout";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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

          <div className="pb-6 flex flex-col">
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

          <div className="pb-8 flex flex-col">
            <label>name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="h-10 p-2 border text-sm rounded-lg"
            />
          </div>

          <button
            // onClick={getUserInfo}
            className="h-11 w-full bg-gray-500 text-white rounded-full"
          >
            新規登録
          </button>
        </div>

        <p className="text-sm pb-10">もしくは</p>

        <button className="h-11 w-64 bg-blue-500 text-white rounded-full">
          Twitterから新規登録
        </button>
      </div>
    </MainLayout>
  );
};

export default SignUp;
