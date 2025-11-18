import { Layout } from '../components/layout';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { masterDataService } from '../lib/api';
import { APP_CONFIG } from '../config/constants';
import { PageLoader } from '../components/ui/Loader';

export const MeetingRoomPage = () => {
  const navigate = useNavigate();
  const breadCrumbs = [{ label: 'Ruang Meeting', href: '/ruang-meeting' }];

  const [meetingRooms, setMeetingRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(APP_CONFIG.PAGE_SIZE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await masterDataService.getMeetingRooms();
        setMeetingRooms(data);
      } catch (error) {
        console.error('Gagal fetch data meeting room:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedRooms = meetingRooms.slice(0, visibleCount);

  return (
    <Layout title="Ruang Meeting" breadCrumbs={breadCrumbs}>
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => navigate('/ruang-meeting/pesan-ruangan')}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Pesan Ruangan</span>
          </Button>
        </div>

        <div className="min-h-64">
          {loading ? (
            <PageLoader text="Memuat data ruangan..." />
          ) : displayedRooms.length === 0 ? (
            <p className="text-gray-500 text-center">Tidak ada data ruangan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayedRooms.map(item => (
                <div
                  key={item.id}
                  className="rounded-xl border border-hr shadow-xs p-5 transition hover:shadow-sm hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold text-text-primary mb-0.5">
                      {item.roomName}
                    </h2>
                    <p className="text-sm text-gray-500">{item.officeName}</p>
                    <hr className="border-hr my-2" />
                    <p className="text-sm text-secondary-500 font-semibold">
                      Kapasitas {item.capacity} Orang
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!loading && meetingRooms.length > APP_CONFIG.PAGE_SIZE && (
          <div className="flex items-center justify-center gap-3 mt-6">
            {visibleCount < meetingRooms.length && (
              <Button
                variant="outline"
                onClick={() => setVisibleCount(prev => prev + APP_CONFIG.PAGE_SIZE)}
              >
                Load More
              </Button>
            )}

            {visibleCount > APP_CONFIG.PAGE_SIZE && (
              <Button
                variant="outline"
                onClick={() => setVisibleCount(APP_CONFIG.PAGE_SIZE)}
              >
                Show Less
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
