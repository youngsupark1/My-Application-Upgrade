import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/api/auth";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4글자에서 10글자 이내로만 가능합니다!");
      return;
    }

    if (password.length < 4 || password.length > 15) {
      alert("비밀번호는 4글자에서 15글자 이내로만 가능합니다!");
      return;
    }

    if (nickname.length < 4 || nickname.length > 10) {
      alert("닉네임은 4글자에서 10글자 이내로만 가능합니다!");
      return;
    }

    // API 호출
    const response = await register({
      id,
      password,
      nickname,
    });
    if (response) {
      confirm("회원가입이 완료되었습니다.");
      navigate("/login");
    }
  };

  const handleForm = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white w-[800px] m-auto p-[20px] rounded-[16px]">
      <h1 className="text-[40px] font-bold">회원가입 </h1>
      <form onSubmit={handleForm}>
        <div className="mt-5 text-[25px] font-bold">
          <p>아이디</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="mt-5 text-[25px] font-bold">
          <p>비밀번호</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-5 text-[25px] font-bold">
          <p>닉네임</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className=" w-[600px] h-[60px] mt-10 m-auto text-[20px] bg-stone-400 content-center text-white rounded-[10px]">
          <button type="button" onClick={handleRegister}>
            완료
          </button>
        </div>
        <div className=" w-[600px] h-[60px] mt-5 m-auto text-[20px] bg-slate-400 content-center text-white rounded-[10px]">
          <button type="button" onClick={() => navigate("/login")}>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}
