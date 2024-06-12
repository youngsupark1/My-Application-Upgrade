import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout user={user} setUser={setUser} />}>
              <Route index element={<Home />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Route>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
