import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header";

const App = () => 
{
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default App
