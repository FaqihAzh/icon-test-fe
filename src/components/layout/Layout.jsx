import { Home, FileText, Bell, ChevronDown, Megaphone } from "lucide-react";
import { cn } from "../../utils/cn";
import { Link, useLocation } from "react-router-dom"; // Tambahkan Link dan useLocation

export const Layout = ({ children, title, subtitle }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Tentukan apakah sidebar harus ditampilkan lebar (md:w-64) atau minimal (w-16)
  const isMinimalSidebar = false; // Atur ke true jika ingin sidebar minimal secara default

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Biru Tua ke Hijau Tosca) */}
      <header className="bg-gradient-to-r from-[#3A92A5] to-[#40C3D4] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl font-semibold">iMeeting</div> 
        </div>
        
        <div className="flex items-center gap-4">
          <button className="hover:bg-opacity-80 p-2 rounded hidden md:block">
            <span className="text-sm">Kontak Aduan</span>
          </button>
          <button className="hover:bg-opacity-80 p-2 rounded">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 hover:bg-opacity-80 p-2 rounded cursor-pointer">
            <div className="w-8 h-8 bg-pink-400 rounded-full"></div>
            <span className="text-sm hidden md:inline">John Doe</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "bg-white border-r min-h-[calc(100vh-64px)] fixed md:static", // Fixed untuk mobile, static untuk desktop
          isMinimalSidebar ? "w-16" : "w-16 md:w-64",
          "z-10" // Pastikan sidebar di atas konten utama pada mobile jika fixed
        )}>
          <nav className="p-2 md:p-4">
            {/* Link Beranda */}
            <Link to="/" className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100",
              currentPath === '/beranda' ? 'bg-gray-100 text-gray-900' : '',
              "md:justify-start justify-center"
            )}>
              <Home className="w-5 h-5" />
              <span className="hidden md:inline">Beranda</span>
            </Link>

            {/* Link Ruang Meeting (Aktif) */}
            <Link to="/" className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-white bg-[#3A92A5]",
              currentPath === '/' ? 'bg-[#3A92A5]' : '',
              "md:justify-start justify-center mt-1"
            )}>
              <FileText className="w-5 h-5" />
              <span className="hidden md:inline">Ruang Meeting</span>
            </Link>
          </nav>
        </aside>

        {/* Overlay untuk tampilan mobile */}
        {/* Hapus ini jika sidebar tetap terlihat. Jika ingin sidebar tersembunyi/overlay, perlu state tambahan. 
            Saat ini, sidebar dibuat fixed w-16 di mobile dan w-64 di desktop. */}
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 p-6 md:p-8",
          !isMinimalSidebar && "ml-16 md:ml-0" // Geser konten utama di mobile karena sidebar w-16
        )}>
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