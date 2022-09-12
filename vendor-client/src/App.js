import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./components/First/First";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./components/Register/Register";
import VendorForm from "./components/VendorForm/VendorForm";
import VendorView from "./components/VendorView/VendorView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/home" element={<First />} />
              <Route path="/vendor/view" element={<VendorView />} />
              <Route path="/vendor/update" element={<VendorForm />} />
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
