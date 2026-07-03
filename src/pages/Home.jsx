import React from "react";
import Sidebar from "../components/ui/SideBar";

function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 pt-20 md:pt-8">
        <h1 className="text-3xl font-bold">Home</h1>
      </div>
    </div>
  );
}

export default Home;