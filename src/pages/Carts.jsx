import Sidebar from "../components/ui/SideBar";

function Carts() {
  return (
    <div className="flex">

      <div className="flex-1 p-8 pt-20 md:pt-8 bg-slate-100 min-h-screen">
        
        <div className="bg-white rounded-3xl shadow-md p-8 mb-8">
          <p className="text-cyan-400 tracking-[6px] text-sm mb-3">
            CARTS
          </p>

          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Cart overview
          </h1>

          <p className="text-gray-500 text-lg">
            All active carts returned from the API are rendered here with their latest item details.
          </p>
        </div>

        
        <div className="border border-dashed border-gray-300 rounded-3xl p-8 bg-white max-w-xl">
          <p className="text-gray-500 text-lg">
            No carts returned from the API.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Carts;