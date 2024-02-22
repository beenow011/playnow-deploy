import React from "react";
import loginImg from "../assets/loginPage.jpg";
import SignIn from "../components/Signin";
function Login() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-black text-white flex h-screen w-screen">
      <div className="flex-1">
        <img
          src={loginImg}
          alt="login image"
          className="object-cover h-screen shadow-white shadow-lg"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}

export default Login;
