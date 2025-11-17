import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Plus } from "lucide-react";

export const MeetingRoomPage = ({ onNavigate }) => {
  return (
    <Layout title="Ruang Meeting" subtitle="Ruang Meeting">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <div className="flex justify-end mb-6">
          <Button 
            onClick={() => onNavigate('create')}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Pesan Ruangan</span>
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">Belum ada pemesanan ruangan</p>
          <p className="text-gray-400 text-sm mt-2">Klik tombol "Pesan Ruangan" untuk membuat pemesanan baru</p>
        </div>
      </div>
    </Layout>
  );
};