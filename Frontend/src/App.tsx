import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./components/css/App.css";
import TestContainer from "./components/TestContainer";
import UserHome from "./components/UserHome";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container-bg">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/test" element={<TestContainer />}></Route>
          <Route path="/u" element={<UserHome />}></Route>
        </Routes>
      </div>
    </>
  );
} //valid sudoku, number of employees who met the target
