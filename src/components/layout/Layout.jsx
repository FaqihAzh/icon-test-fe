import { Home, FileText, Bell, ChevronDown, Megaphone } from "lucide-react";
import { cn } from "../../utils/cn";

export const Layout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#3A92A5] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 w-10 h-10 rounded flex items-center justify-center">
            <Megaphone className="w-6 h-6 text-[#3A92A5]" />
          </div>
          <span className="text-xl font-semibold">iMeeting</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hover:bg-[#2d7388] p-2 rounded">
            <span className="hidden md:inline text-sm">Kontak Aduan</span>
          </button>
          <button className="hover:bg-[#2d7388] p-2 rounded">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 hover:bg-[#2d7388] p-2 rounded cursor-pointer">
            <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
            <span className="text-sm hidden md:inline">John Doe</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-16 md:w-64 bg-white border-r min-h-[calc(100vh-72px)]">
          <nav className="p-2 md:p-4">
            <button className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100",
              "md:justify-start justify-center"
            )}>
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Beranda</span>
            </button>
            <button className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white bg-[#3A92A5]",
              "md:justify-start justify-center mt-1"
            )}>
              <FileText className="w-5 h-5" />
              <span className="hidden md:inline">Ruang Meeting</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};