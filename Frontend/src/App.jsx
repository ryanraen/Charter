import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./components/css/App.css";
import UserHome from "./components/UserHome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container-bg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/u" element={<UserHome />}></Route>
          <Route path="/u/settings"></Route>
        </Routes>
      </div>
    </>
  );
}
