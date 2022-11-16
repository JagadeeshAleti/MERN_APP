import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerUpdate from "./pages/CustomerUpdate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerView from "./pages/CustomerView";
import Services from "./pages/Services";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/home" element={<Services />} />
              <Route path="/customer/view" element={<CustomerView />} />
              <Route path="/customer/update" element={<CustomerUpdate />} />
              <Route path="/customer/services" element={<Services />} />
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
