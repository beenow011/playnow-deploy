import { useState } from "react";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 ">
      <Outlet />
    </div>
  );
}

export default App;
