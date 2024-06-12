import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";

export default function Login({ setUser }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignClick = () => {
    navigate("/signup");
  };

  const handleForm = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const { userId, nickname, avatar } = await login({
      id,
      password,
    });
    setUser({ userId, nickname, avatar });
  };

  return (
    <div className="bg-white w-[800px] m-auto p-[20px] rounded-[16px]">
      <h1 className="text-[40px] font-bold">로그인</h1>
      <form onSubmit={handleForm}>
        <div className="mt-5 text-[25px] font-bold">
          <p>아이디</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="text"
            placeholder="아이디"
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="mt-5 text-[25px] font-bold">
          <p>비밀번호</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className=" w-[600px] h-[60px] mt-10 m-auto text-[20px] bg-stone-400 content-center text-white rounded-[10px]">
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>

        <div className=" w-[600px] h-[60px] mt-5 m-auto text-[20px] bg-slate-400 content-center text-white rounded-[10px]">
          <button type="button" onClick={handleSignClick}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}
