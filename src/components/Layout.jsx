import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../lib/api/auth";

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  // 로그인이 되어 있는지 안되어 있는지 확인하는
  // 로그인이 되어 있지 않다면 홈으로 이동 불가
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avater: res.avater,
        });
      } else {
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-2.5 flex justify-between items-center fixed w-[calc(100%-2rem)] top-0 z-1000 max-w-[1240px]">
        <div className="flex items-center">
          <a
            href="/"
            to="/"
            className="text-white mx-2.5 no-underline hover:underline"
          >
            Home
          </a>
          <a
            href="/profile"
            to="/profile"
            className="text-white mx-2.5 no-underline hover:underline"
          >
            내 프로필
          </a>
        </div>
        <div className="flex items-center">
          {user && (
            <>
              <img
                src={user.avater}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-2.5"
              />
              <span className="text-white mr-5">{user.nickname}</span>
              <button
                className="px-3 py-2 bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-700"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          )}
        </div>
      </nav>
      <div className="py-[60px]">
        <Outlet />
      </div>
    </>
  );
}
