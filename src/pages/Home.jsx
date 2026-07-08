import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Sidebar from "../components/ui/SideBar";
import NavBar from "../components/ui/NavBar";
function Home() {
  return (
    <div className="flex bg-sky-50 dark:bg-slate-900 w">
      <Sidebar />
      <NavBar />
      <div className="flex-1 p-4  md:pt-8">
          <Dashboard />
      </div>
    </div>
  );
}

export default Home;