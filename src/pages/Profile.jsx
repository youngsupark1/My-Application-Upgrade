import { useState } from "react";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleUpdateProfile = async () => {
    console.log(nickname);
    console.log(avatar);

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    }
  };

  return (
    <>
      <div className="max-w-sm mx-auto p-5 bg-gray-100 rounded-lg">
        <h2>프로필 수정</h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="nickname">
            닉네임
          </label>
          <input
            className="w-full p-2 box-border"
            type="text"
            placeholder="닉네임"
            minLength="1"
            maxLength="10"
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="avatar">
            아바타 이미지
          </label>
          <input
            className="w-full p-2 box-border"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <button
          className="w-full p-2.5 bg-blue-500 text-white border-none rounded cursor-pointer mb-2.5"
          onClick={handleUpdateProfile}
        >
          프로필 업데이트
        </button>
      </div>
    </>
  );
}
