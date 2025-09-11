import React, { memo } from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Layout() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 1000 }} />
      <Header />
      <Outlet />
    </>
  );
}

export default memo(Layout);
