import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Sidebar from "../components/ui/SideBar";
import NavBar from "../components/ui/NavBar";
import { useEffect } from "react";



function Home() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex bg-sky-50 dark:bg-slate-900">
     
      <div className="flex-1   md:pt-4">
          <Dashboard />
      </div>
    </div>
  );
}

export default Home;