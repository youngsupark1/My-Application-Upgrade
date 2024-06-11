import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );
      const data = response.data;
      if (data.success) {
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-white w-[800px] m-auto p-[20px] rounded-[16px]">
      <h1 className="text-[40px] font-bold">회원가입 </h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-5 text-[25px] font-bold">
          <p>아이디</p>
          <input
            className="w-[600px] h-[40px] mt-5 p-3 outline rounded-[10px] "
            type="text"
            placeholder="아이디"
            value={id}
            maxLength="10"
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
            maxLength="15"
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
            maxLength="10"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className=" w-[600px] h-[60px] mt-10 m-auto text-[20px] bg-stone-400 content-center text-white rounded-[10px]">
          <button type="submit">완료</button>
        </div>
        <div className=" w-[600px] h-[60px] mt-5 m-auto text-[20px] bg-slate-400 content-center text-white rounded-[10px]">
          <button onClick={handleLoginClick}>로그인</button>
        </div>
      </form>
    </div>
  );
}
