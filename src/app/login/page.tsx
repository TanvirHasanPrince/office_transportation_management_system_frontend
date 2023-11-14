import LoginPage from "@/components/login/Login";
import { Metadata } from "next";

  export const metadata: Metadata = {
    title: "Login",
  };

const Login = () => {


  return (
    <div>
      <LoginPage></LoginPage>
    </div>
  );
};

export default Login;