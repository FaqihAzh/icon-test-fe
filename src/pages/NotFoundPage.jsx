import { useNavigate } from 'react-router-dom';
import {  ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Halaman Tidak Ditemukan
            </h2>
            <p className="text-gray-600">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <Button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Ke Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
