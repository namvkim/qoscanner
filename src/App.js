import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import DataContext from "./context";

import LoadingComponent from "./components/LoadingComponent";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Forgot from "./screens/Forgot";
import NotFound from "./screens/NotFound";
import Menu from "./screens/Menu";
import Orders from "./screens/Orders";
import CreateMenu from "./screens/CreateMenu";
import CreateQRCode from "./screens/CreateQRCode";
import Customer from "./screens/Customer";
import Voucher from "./screens/Voucher";
import Setting from "./screens/Setting";
import CreateCategory from "./screens/CreateCategory";
import ResInformation from "./screens/ResInformation";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <LoadingComponent />
  ) : (
    <DataContext.Provider value={""}>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={user ? <Menu /> : <Navigate to="/login" />}>
          <Route path="/" element={<Orders />} />
          <Route path="/CreateCategory" element={<CreateCategory />} />
          <Route path="/CreateMenu" element={<CreateMenu />} />
          <Route path="/CreateQRCode" element={<CreateQRCode />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/Voucher" element={<Voucher />} />
          <Route path="/thongtincuahang" element={<ResInformation />} />
          <Route path="/Setting" element={<Setting />} />
        </Route>
      </Routes>
    </DataContext.Provider>
  );
};

export default App;
