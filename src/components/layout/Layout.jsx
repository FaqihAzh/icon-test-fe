import { Home, File, ChevronDown, LayoutDashboard } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link, useLocation } from "react-router-dom";
import IconLogo from "../../assets/images/icon-logo.png";
import MegaphoneIcon from "../../assets/icons/megaphone.svg";
import BellIcon from "../../assets/icons/notify.svg";
import { Breadcrumb } from "../ui/Breadcrumb";

export const Layout = ({ children, title, breadCrumbs }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard },
    { label: "Beranda", path: "/beranda", icon: Home },
    { label: "Ruang Meeting", path: "/ruang-meeting", icon: File },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ---------- Header (tetap) ---------- */}
      <header className="bg-gradient-to-r from-[#18A2BA] to-[#296377] text-white px-4 md:px-6 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-4">
          <img src={IconLogo} alt="Logo" className="w-9 h-auto" />
          <div className="text-base font-bold">iMeeting</div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="bg-[#3D7D8F] hover:bg-opacity-80 px-3 py-2.5 rounded-lg flex items-center cursor-pointer">
            <img src={MegaphoneIcon} alt="Aduan Icon" className="w-5 h-5 inline-block mr-2" />
            <span className="text-sm font-semibold text-white hidden md:block">Kontak Aduan</span>
          </button>
          <button className="hover:bg-opacity-80 p-2 rounded cursor-pointer">
            <img src={BellIcon} alt="Notifications" className="w-5 h-auto" />
          </button>
          <div className="flex items-center gap-3 hover:bg-opacity-80 rounded cursor-pointer">
            <div className="w-7 h-7 bg-pink-400 rounded-full"></div>
            <span className="text-sm font-semibold hidden md:inline">John Doe</span>
            <ChevronDown className="-ml-1 w-4 h-4" />
          </div>
        </div>
      </header>

      {/* ---------- Body (sidebar + konten) ---------- */}
      <div className="flex flex-1 min-h-0 mt-16">
        {/* Sidebar (tetap) */}
        <aside
          className={cn(
            "bg-white shadow-md",
            "w-16 md:w-64",
            "flex flex-col",
            "fixed top-16 left-0 h-[calc(100vh-64px)] z-10" // tetap di layar
          )}
        >
          <nav className="p-2 md:p-4 flex-1">
            {menuItems.map(({ label, path, icon: Icon }) => {
              const isActive = currentPath === path || currentPath.includes(path + '/');
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg",
                    "md:justify-start justify-center",
                    isActive
                      ? "bg-[#4A8394] text-white"
                      : "text-[#4A8394] hover:bg-gray-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-md hidden md:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ---------- Konten (bisa digulir) ---------- */}
        <main className="flex-1 overflow-y-auto ml-16 md:ml-64 pt-4">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-6 space-y-1.5">
              <h1 className="text-2xl md:text-3xl font-bold text-[#333333]">{title}</h1>
              <Breadcrumb items={breadCrumbs} />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};