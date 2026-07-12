import url_Dark from "../../logo_Dark_Mode.png";
import url_Light from "../../Logo_Light_mode.png";
import { Bell, Moon, LogOut, Sun, User2 } from "lucide-react";
import { useContext, useState } from "react";
import { useSidebar } from "../../context/SidebarContext";

const NavBar = ({ themes, setThemes }) => {
  const { isCollapsed } = useSidebar();
  const [toggle, setTggle] = useState(false)

  return (
    <div
      className={`
        fixed top-0 right-0 z-40
        h-20
        flex items-center justify-between
        border-b border-slate-200 dark:border-slate-700
        bg-white dark:bg-slate-900
        shadow-sm

        w-full
       ${isCollapsed
          ? "md:w-[calc(100%-76px)] lg:w-[calc(100%-76px)]"
          : "md:w-[calc(100%-248px)] lg:w-[calc(100%-248px)]"
        }`}
    >
      {/* Left */}
      <div className="flex items-center h-full w-auto md:w-[350px] lg:w-[350px] lg:ml-0 md:ml-12 px-3">

        <img
          src={themes !== 'light' ? url_Dark : url_Light}
          alt="Logo"
          className="w-28 md:w-36 lg:w-40 ml-2"
        />

        <div className="hidden lg:block ml-4 text-slate-900 dark:text-white">
          <p className="font-bold leading-5">
            <span className="text-xl  whitespace-nowrap">
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
      <div className="flex items-center lg:justify-end gap-2 px-3 lg:w-[45%]">

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
          flex items-center justify-center cursor-pointer
        "
        >
          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Theme */}
        <button
          onClick={setThemes}
          className="
          w-11 h-11
          rounded-xl
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-black dark:text-white
          shadow-md hover:shadow-lg
          flex items-center justify-center cursor-pointer
        "
        >
          {themes === "light" ? (
            <Moon size={20} />
          ) : (
            <Sun size={20} />
          )}
        </button>

        {/* Admin */}
        <div
          className="
            items-center justify-start
            gap-2
            px-1 py-1
            rounded-xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            shadow-sm
            hover:shadow-md
          "
        >
          {/* Avatar */}
          <button
            onClick={() => setTggle(!toggle)}
            className="h-9 w-9
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            flex items-center justify-center
            text-white
            font-semibold
            text-sm
            shrink-0
            cursor-pointer
          ">
            AA
          </button>

          {/* Info */}

        </div>
        <div
          className={`
    absolute
    top-[87%]
    right-3
    mt-2
    w-56
    rounded-xl
    border border-slate-200 dark:border-slate-700
    bg-white dark:bg-slate-900
    shadow-xl
    overflow-hidden
    z-50
    menu
    ${toggle
              ? "opacity-100 scale-100 translate-y-0 visible"
              : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
            }
  `}
        >
          {/* User Info */}
          <button
            className="
      w-full
      flex items-center gap-3
      px-4 py-3
      hover:bg-slate-50 dark:hover:bg-slate-800
      transition-colors cursor-pointer
    "
          >
            <div
              className="
        w-10 h-10
        rounded-full
        bg-gradient-to-br
        from-cyan-500
        to-blue-600
        flex items-center justify-center
        text-white
        font-semibold
        shrink-0
      "
            >
              <User2 size={20} />
            </div>

            <div className="text-left">
              <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                Admin Account
              </h4>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administrator
              </p>
            </div>
          </button>

          {/* Divider */}
          <div className="border-t border-slate-200 dark:border-slate-700" />

          {/* Logout */}
          <button
            className="
      w-full
      flex items-center gap-3
      px-4 py-3
      text-red-500
      hover:bg-red-50
      dark:hover:bg-red-500/10
      transition-colors cursor-pointer
    "
          >
            <LogOut size={18} />

            <span className="text-sm">
              Log Out
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default NavBar;