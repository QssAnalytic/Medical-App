import { useNavigate } from "react-router-dom";
import SignInForm from "./components/sign-in-form";
import useAuthStore from "@/services/store/authStore";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuthStore();

  useEffect(() => {
   isAuth && navigate('/')
  }, [isAuth, navigate]);

  return (
    <>
        <div className="relative font-inter">
          <div className="bg-contain  bg-no-repeat w-full h-screen absolute top-0 left-0 bg-[url('/images/LoginBG.svg')]">
            <div className="flex h-full ">
              <div className="bg-[#068F84C4] w-1/2 h-full bg-opacity-75"></div>
              <SignInForm />
            </div>
          </div>
        </div>
    </>
  );
};

export default Login;
