import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./components/css/App.css";
import UserHome from "./components/UserHome";
import Settings from "./components/Settings";
import Workspace from "./components/Workspace";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/u" element={<UserHome />} />
          <Route path="/u/w" element={<Workspace />} />
        </Routes>
      </div>
    </>
  );
}
