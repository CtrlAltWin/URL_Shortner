import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="px-4 sm:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
