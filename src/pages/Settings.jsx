import Sidebar from "../components/ui/SideBar";
import {
  Moon,
  Sun,
  Bell,
  Shield,
  Globe,
  Palette,
} from "lucide-react";

function Settings() {
  return (
    <div className="flex">
      <div
        className="
          flex-1
          mt-10
          bg-transparent
        "
      >
        {/* Header */}
        <div
          className="
            bg-white
            dark:bg-slate-900
            shadow-sm
            mb-8
            relative overflow-hidden rounded-xl border border-cyan-200 dark:border-cyan-900 bg-gradient-to-r from-white to-cyan-200/20 dark:from-gray-900 dark:to-cyan-950/30 p-8 max-sm:flex-col max-sm:items-start max-sm:gap-8
          "
        >
          <p className="text-xs uppercase tracking-[2px] text-cyan-800 dark:text-cyan-300 pl-0.5">
            Settings
          </p>

          <h1 className="font-bold text-xl sm:text-3xl text-cyan-950 dark:text-white">
            Preferences & Integrations
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage your dashboard preferences, appearance, notifications, and
            security settings.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Settings;