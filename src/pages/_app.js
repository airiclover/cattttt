import { useGetUserInfo, useCheckLogin } from "src/pages/login";
import "tailwindcss/tailwind.css";

const MyApp = ({ Component, pageProps }) => {
  // const { email, setEmail, password, setPassword, uid, getUserInfo } =
  //   useGetUserInfo();
  // 👆👇はイコール (一つのオブジェクトにまとめてるだけ。)
  const globalGetUser = useGetUserInfo();

  return (
    <>
      <Component {...pageProps} {...globalGetUser} />
    </>
  );
};

export default MyApp;
