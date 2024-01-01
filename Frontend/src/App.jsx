import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/u" element={<UserHome />} />
            <Route path="/u/settings" element={<Settings />} />
            <Route path="/u/w/:id" element={<Workspace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
