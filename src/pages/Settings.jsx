import Sidebar from "../components/ui/SideBar";
import {
  Moon,
  Sun,
  Bell,
  Shield,
  Globe,
  Palette,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

function Settings() {
  const { theme, setTheme } = useTheme();
  
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

      {/* Settings Content */}
  <div className="space-y-8">

  {/* Appearance */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">

    <div className="flex items-center gap-2 mb-6">
      <Palette className="w-5 h-5 text-cyan-600" />
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Appearance
      </h2>
    </div>

    <div className="space-y-6">

      <div>
        <p className="font-medium text-slate-700 dark:text-slate-300 mb-3">
          Theme
        </p>

        <div className="space-y-2">

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
            />
            <Sun size={18} />
            <span>Light</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
            />
            <Moon size={18} />
            <span>Dark</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              checked={theme === "system"}
              onChange={() => setTheme("system")}
            />
            <span>System</span>
          </label>

        </div>
      </div>

      <div>
        <p className="font-medium text-slate-700 dark:text-slate-300 mb-3">
          Accent Color
        </p>

        <div className="flex gap-4">

          <button className="w-7 h-7 rounded-full bg-cyan-500 border-2 border-white shadow" />

          <button className="w-7 h-7 rounded-full bg-purple-500 border-2 border-white shadow" />

          <button className="w-7 h-7 rounded-full bg-green-500 border-2 border-white shadow" />

        </div>
      </div>

    </div>

  </div>

  {/* Notifications */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">

    <div className="flex items-center gap-2 mb-6">
      <Bell className="w-5 h-5 text-cyan-600" />
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Notifications
      </h2>
    </div>

    <div className="space-y-4">

      <label className="flex items-center justify-between">
        <span>Email Notifications</span>
        <input type="checkbox" defaultChecked />
      </label>

      <label className="flex items-center justify-between">
        <span>Push Notifications</span>
        <input type="checkbox" defaultChecked />
      </label>

      <label className="flex items-center justify-between">
        <span>Weekly Reports</span>
        <input type="checkbox" />
      </label>

    </div>

  </div>

  {/* Security */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">

    <div className="flex items-center gap-2 mb-6">
      <Shield className="w-5 h-5 text-cyan-600" />
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Security
      </h2>
    </div>

    <div className="space-y-5">

      <button className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition">
        Change Password
      </button>

      <div className="flex items-center justify-between">

        <div>
          <p className="font-medium">
            Two Factor Authentication
          </p>

          <p className="text-sm text-slate-500">
            Disabled
          </p>

        </div>

        <input type="checkbox" />

      </div>

      <button className="text-cyan-600 hover:underline">
        Manage Devices
      </button>

    </div>

  </div>

  {/* Language */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">

    <div className="flex items-center gap-2 mb-6">
      <Globe className="w-5 h-5 text-cyan-600" />
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
        Language & Region
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <div>
        <label className="block mb-2 font-medium">
          Language
        </label>

        <select className="w-full border rounded-lg p-2 dark:bg-slate-800">
          <option>English</option>
          <option>Arabic</option>
        </select>

      </div>

      <div>
        <label className="block mb-2 font-medium">
          Timezone
        </label>

        <select className="w-full border rounded-lg p-2 dark:bg-slate-800">
          <option>Jerusalem</option>
          <option>London</option>
          <option>Dubai</option>
        </select>

      </div>

      <div>
        <label className="block mb-2 font-medium">
          Currency
        </label>

        <select className="w-full border rounded-lg p-2 dark:bg-slate-800">
          <option>USD</option>
          <option>EUR</option>
          <option>ILS</option>
        </select>

      </div>

    </div>

  </div>

  {/* Data */}
  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">

    <h2 className="text-lg font-semibold mb-5 text-slate-800 dark:text-white">
      Data
    </h2>

    <div className="flex flex-wrap gap-4">

      <button className="px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition">
        Export Data
      </button>

      <button className="px-5 py-2 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-800 transition">
        Delete Cache
      </button>

    </div>

  </div>

  {/* Danger Zone */}
  <div className="bg-red-50 dark:bg-red-950 rounded-xl border border-red-300 dark:border-red-800 p-6">

    <h2 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-3">
      Danger Zone
    </h2>

    <p className="text-sm text-red-500 mb-5">
      These actions are permanent and cannot be undone.
    </p>

    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition">
      Delete Account
    </button>

  </div>

</div>
      </div>
    </div>
  );
}

export default Settings;