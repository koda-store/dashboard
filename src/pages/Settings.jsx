import Sidebar from "../components/ui/SideBar";

function Settings() {
  return (
    <div className="flex">

      <div className="flex-1 p-8 pt-20 md:pt-8 bg-[#f5f7fb] min-h-screen">

        <div className="bg-white rounded-3xl shadow-md p-8">
          <p className="text-cyan-400 tracking-[6px] text-sm mb-3">
            SETTINGS
          </p>

          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Preferences and integrations
          </h1>

          <p className="text-gray-500 text-lg">
            Theme mode, API credentials, and dashboard preferences are managed here.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Settings;