import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const MeetingRoomPage = () => { // Hapus prop onNavigate
  const navigate = useNavigate();

  return (
    <Layout title="Ruang Meeting" subtitle="Ruang Meeting">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => navigate('/create')}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Pesan Ruangan</span>
          </Button>
        </div>

        {/* Konten Utama (Dikosongkan sesuai gambar, hanya menampilkan box kosong) */}
        <div className="h-64 flex items-center justify-center text-gray-500">
          {/* Tampilan ini sengaja dikosongkan untuk mencocokkan tampilan pada gambar */}
          {/* Anda dapat menambahkan tabel daftar pemesanan di sini di masa mendatang */}
        </div>
        
        {/* Empty state yang sebelumnya ada di sini dihapus agar konsisten dengan gambar */}
      </div>
    </Layout>
  );
};