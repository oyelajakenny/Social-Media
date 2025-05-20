import React from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Widgets from "./components/Widgets";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className=" px-40 mt-2 bg-slate-100 h-screen">
        <div className=" flex justify-center gap-4">
          <SideBar />
          <Outlet/>
          <Widgets />
        </div>
      </main>
    </>
  );
};

export default RootLayout;
