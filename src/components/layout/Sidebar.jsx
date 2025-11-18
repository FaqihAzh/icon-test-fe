import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Home, File, PanelLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

const menuItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Beranda', path: '/beranda', icon: Home },
  { label: 'Ruang Meeting', path: '/ruang-meeting', icon: File },
];

export const Sidebar = () => {
  const location = useLocation();
  const [mini, setMini] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMini(true);
        setIsMobile(true);
      } else {
        setMini(false);
        setIsMobile(false);
      }
    };

    handleResize(); // inisialisasi awal
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <aside
        className={cn(
          'bg-white shadow-md fixed top-16 left-0 h-[calc(100vh-64px)] z-10',
          'transition-all duration-300 ease-in-out',
          mini ? 'w-16' : 'w-64'
        )}
      >
        <nav
          className={cn(
            'flex flex-col h-full transition-all duration-300 ease-in-out',
            mini ? 'p-2' : 'p-4'
          )}
        >
          <div className="flex-1 space-y-2">
            {menuItems.map(({ label, path, icon: Icon }) => {
              const active =
                location.pathname === path ||
                location.pathname.startsWith(path + '/');
              return (
                <Link
                  key={path}
                  to={path}
                  title={label}
                  className={cn(
                    'flex items-center justify-center md:justify-normal gap-3 p-3 rounded-lg',
                    active
                      ? 'bg-secondary-500 text-white'
                      : 'text-secondary-500 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className={cn('text-md', mini && 'hidden')}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Collapse button */}
          <button
            onClick={() => !isMobile && setMini((s) => !s)}
            className={cn(
              'mx-auto p-2 rounded-lg hover:bg-gray-100 text-secondary-500',
              isMobile && 'cursor-not-allowed opacity-50'
            )}
            title={isMobile ? 'Tidak bisa diubah di mobile' : 'Toggle Sidebar'}
          >
            <PanelLeft
              className={cn(
                'w-5 h-5 transition-transform duration-300',
                !mini && 'rotate-180'
              )}
            />
          </button>
        </nav>
      </aside>

      {/* Placeholder div untuk offset konten */}
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          mini ? 'pl-16' : 'pl-64'
        )}
      />
    </>
  );
};
