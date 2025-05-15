import React from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Widgets from "./components/Widgets";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="container main_container ">
          <SideBar />
          <Outlet/>
          <Widgets />
        </div>
      </main>
    </>
  );
};

export default RootLayout;
