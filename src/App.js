import './App.css';
import routes from './routes';
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import DataContext from './context';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("login");
      }
    });
  }, []);


  const showContentMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            element={route.main}
          />
        );
      });
    }
    return result;
  };

  return (
    <DataContext.Provider value={''}>
      <Routes>
        {showContentMenu(routes)}
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
