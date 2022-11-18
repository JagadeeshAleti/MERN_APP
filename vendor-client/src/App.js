import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./components/First";
import ProtectedRoute from "./components/ProtectedRoute";
import VendorUpdate from "./pages/VendorUpdate";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorView from "./pages/VendorView";
import Service from "./pages/Service";
import ProvideService from "./pages/ProvideService";
import ActiveServices from "./pages/ActiveServices";
import EditActiveService from "./pages/EditActiveService";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />}>
                            <Route path="/home" element={<First />} />
                            <Route path="/vendor/view" element={<VendorView />} />
                            <Route path="/vendor/update" element={<VendorUpdate />} />
                            <Route path="/vendor/services" element={<Service />} />
                            <Route path="/vendor/avtive-services" element={<ActiveServices />} />
                            <Route path="/vendor/service/provide/:id" element={<ProvideService />} />
                            <Route path="/vendor/service/editService/:id" element={<EditActiveService />} />
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
