import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';

export const Layout = ({
  children,
  title,
  breadCrumbs,
  showBack = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1 min-h-0 mt-16">
        <Sidebar />

        <main className="flex-1 overflow-y-auto pt-4">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            <div className="mb-6 space-y-1.5">
              <div className="flex items-center gap-4">
                {showBack && (
                  <Button
                    onClick={() => navigate(-1)}
                    className="grid place-content-center w-10 h-10 rounded-lg  transition-colors mb-3.5 cursor-pointer"
                    aria-label="Kembali"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                )}

                <div>
                  {title && (
                    <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                      {title}
                    </h1>
                  )}
                  {breadCrumbs && <Breadcrumb items={breadCrumbs} />}
                </div>
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
};