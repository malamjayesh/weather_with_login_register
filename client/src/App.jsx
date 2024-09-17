import "./App.css";
import Login from "./Auth/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Auth/Register";
import Home from "./Auth/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
