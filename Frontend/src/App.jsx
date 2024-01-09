import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./components/css/App.css";
import UserHome from "./components/UserHome";
import Settings from "./components/Settings";
import Workspace from "./components/Workspace";
import { useState } from "react";
import { getCookie } from "./util/CookieManager";

export default function App() {
  const [navbarUsername, setNavbarUsername] = useState(getCookie("username"));
  return (
    <>
      <Navbar username={navbarUsername} />
      <div className="container-bg">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/u" element={<UserHome />} />
            <Route path="/u/settings" element={<Settings setNavBarUsername={setNavbarUsername} />} />
            <Route path="/u/w/:id" element={<Workspace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
