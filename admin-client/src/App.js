import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./components/First";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminView from "./pages/AdminView";
import AdminUpdate from "./pages/AdminUpdate";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/home" element={<First />} />
              <Route path="/admin/view" element={<AdminView />} />
              <Route path="/admin/update" element={<AdminUpdate />} />
            </Route>
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
