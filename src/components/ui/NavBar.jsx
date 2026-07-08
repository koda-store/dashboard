
import url from "../../KodaLogo2-D3eRgjLV.png";
import { Bell, Moon, LogOut, Sun } from "lucide-react";
import { useContext } from "react";
import { Theme } from "../Navbar/Context";
import { useSidebar } from "../../context/SidebarContext";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(Theme);
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`
        fixed top-0 right-0 z-40
        h-20
        flex items-center justify-between
        border-b border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-900
        shadow-sm
        transition-all duration-300

        w-full
       ${
  isCollapsed
    ? "md:w-[calc(100%-76px)] lg:w-[calc(100%-76px)]"
    : "md:w-[calc(100%-248px)] lg:w-[calc(100%-248px)]"
}`}
    >
      {/* Left */}
      <div className="flex items-center h-full w-auto md:w-[350px] lg:w-[350px] lg:ml-0 md:ml-12 px-3">

        <img
          src={url}
          alt="Logo"
          className="w-28 md:w-36 lg:w-40 ml-2"
        />

        <div className="hidden lg:block ml-4 text-slate-900 dark:text-white">
          <p className="font-bold leading-5">
            <span className="text-xl">
              Koda Dashboard
            </span>

            <br />

            <small className="text-xs font-light text-slate-500 dark:text-slate-400">
              E-Commerce Admin Panel
            </small>
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3 lg:justify-around px-3 lg:w-[45%]">

        {/* Notification */}
        <button
          className="
          relative
          w-11 h-11
          rounded-xl
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-black dark:text-white
          shadow-md hover:shadow-lg
          flex items-center justify-center
        "
        >
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="
          w-11 h-11
          rounded-xl
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-black dark:text-white
          shadow-md hover:shadow-lg
          flex items-center justify-center
        "
        >
          {theme === "light" ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>

        {/* Admin */}
        <div
          className="
          hidden lg:flex
          items-center justify-around
          w-[47%] h-[75%]
          rounded-2xl
          border border-slate-200 dark:border-slate-700
          bg-slate-50 dark:bg-slate-800
          text-black dark:text-white
        "
        >
          <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
            AA
          </div>

          <div className="p-1">
            <p className="font-bold leading-5 whitespace-nowrap">
              Admin Account
              <br />

              <span className="text-sm font-light text-slate-500 dark:text-slate-400">
                Admin
              </span>
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          className="
          h-11
          px-3
          rounded-xl
          bg-red-500 hover:bg-red-600
          text-white font-bold
          flex items-center gap-2
        "
        >
          <LogOut size={20} />

          <span className="hidden md:hidden lg:inline whitespace-nowrap">
            Log Out
          </span>
        </button>

      </div>
    </div>
  );
};

export default NavBar;