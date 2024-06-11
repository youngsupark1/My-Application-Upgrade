import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [inputIdCount, setInputIdCount] = useState(0);
  const [inputPassCount, setInputPassCount] = useState(0);

  const navigate = useNavigate();

  const handleSignClick = () => {
    navigate("/signup");
  };

  const onInputIdHandler = (e) => {
    setInputIdCount(e.target.value.length);
  };

  const onInputPassHandler = (e) => {
    setInputPassCount(e.target.value.length);
  };

  return (
    <div className="bg-white w-[800px] m-auto p-[20px] rounded-[16px]">
      <h1 className="text-[40px] font-bold">로그인</h1>
      <form>
        <div className="mt-5 text-[25px] font-bold">
          <p>아이디</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="text"
            placeholder="아이디"
            maxLength="10"
            onChange={onInputIdHandler}
          />
        </div>
        <p>
          <span>{inputIdCount}</span>
          <span>/10 자</span>
        </p>

        <div className="mt-5 text-[25px] font-bold">
          <p>비밀번호</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="password"
            placeholder="비밀번호"
            maxLength="15"
            onChange={onInputPassHandler}
          />
        </div>
        <p>
          <span>{inputPassCount}</span>
          <span>/15 자</span>
        </p>

        <div className=" w-[600px] h-[60px] mt-10 m-auto text-[20px] bg-stone-400 content-center text-white rounded-[10px]">
          <button type="submit">Login</button>
        </div>

        <div className=" w-[600px] h-[60px] mt-5 m-auto text-[20px] bg-slate-400 content-center text-white rounded-[10px]">
          <button onClick={handleSignClick}>회원가입</button>
        </div>
      </form>
    </div>
  );
}
