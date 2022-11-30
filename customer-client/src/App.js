import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerUpdate from "./pages/CustomerUpdate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerView from "./pages/CustomerView";
import Services from "./pages/Services";
import ServiceByName from "./pages/ServiceByName";

import { ConfirmDialog } from "./pages/ConfirmDialog";

function App() {
  return (
    <div className="App">
      <ConfirmDialog />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/home" element={<Services />} />
              <Route path="/customer/view" element={<CustomerView />} />
              <Route path="/customer/update" element={<CustomerUpdate />} />
              <Route path="/customer/services" element={<Services />} />
              <Route path='/customer/service/:serviceName' element={<ServiceByName />} />
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
