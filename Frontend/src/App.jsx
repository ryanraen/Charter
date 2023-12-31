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
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/u" Component={UserHome} />
          <Route path="/u/settings" Component={Settings} />
          <Route path="/u/w" Component={Workspace} />
        </Routes>
      </div>
    </>
  );
}
