import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./container/layout/Layout";
import Home from "./container/pages/Home";
import { ROUTES } from "./utils/constant";
import History from "./container/pages/History";
import AuthForm from "./container/pages/AuthForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES?.HISTORY} element={<History />} />
            <Route path={ROUTES?.USER_IP} element={<History />} />
            <Route path={ROUTES?.REGISTER} element={<AuthForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
