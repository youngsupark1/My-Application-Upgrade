import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}>
            <Route index element={<Home user={user} />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
          </Route>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
