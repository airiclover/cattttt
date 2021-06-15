import { useGetUserInfo, useCheckLogin } from "src/pages/login";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  // const { email, setEmail, password, setPassword, uid, getUserInfo } =
  //   useGetUserInfo();
  // 👆👇はイコール (一つのオブジェクトにまとめてるだけ。)
  const userInfo = useGetUserInfo();
  useCheckLogin();

  return (
    <>
      <Component {...pageProps} {...userInfo} />
    </>
  );
};

export default MyApp;
