import React from "react";
import { api } from "../../api/axios";



function Overview() {
  return (
<section className="my-8 rounded-xl bg-white p-7 shadow-xl w-full">     
      <h1 className="tracking-widest  text-xl font text-cyan-600 ">
       Admin overview
      </h1>
<p className="mt-2 text-black-500 italic">Real-time commerce health</p>
      <span className="mt-2 text-gray-500 italic">
        Manage your products, customers, and orders from one place.
      </span>
    </section>
  );
}

export default Overview;