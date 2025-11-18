import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// API
const BASE_URL_1 = "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data";

export const api = {
  getMasterMeetingRooms: async () => {
    const response = await fetch(`${BASE_URL_1}/masterMeetingRooms`);
    return response.json();
  },
};

export const MeetingRoomPage = () => {
  const navigate = useNavigate();

  const breadCrumbs = [{ label: "Ruang Meeting", href: "/ruang-meeting" }];

  const [meetingRooms, setMeetingRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const PAGE_SIZE = 6;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMasterMeetingRooms();
        setMeetingRooms(data);
      } catch (error) {
        console.error("Gagal fetch data meeting room:", error);
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
        
        {/* BUTTON PESAN */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => navigate("/ruang-meeting/pengajuan-perangkat")}
            className="flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Pesan Ruangan</span>
          </Button>
        </div>

        {/* LIST */}
        <div className="min-h-64">
          {loading ? (
            <p className="text-gray-500 text-center">Loading...</p>
          ) : displayedRooms.length === 0 ? (
            <p className="text-gray-500 text-center">Tidak ada data ruangan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayedRooms.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#EEEEEE] shadow-xs p-5 transition hover:shadow-sm hover:scale-[1.01] cursor-pointer"
                >
                  <div className="flex flex-col">

                    {/* Nama Ruangan */}
                    <h2 className="text-lg font-semibold text-[#333333] mb-0.5">
                      {item.roomName}
                    </h2>

                    {/* Office */}
                    <p className="text-sm text-[#9E9E9E]">{item.officeName}</p>

                    {/* Divider */}
                    <hr className="bg-[#EEEEEE] text-[#EEEEEE] my-2" />

                    {/* Kapasitas */}
                    <p className="text-sm text-[#4A8394] font-semibold">
                      Kapasitas {item.capacity} Orang
                    </p>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {!loading && meetingRooms.length > PAGE_SIZE && (
          <div className="flex items-center justify-center gap-3 mt-6">
            {visibleCount < meetingRooms.length && (
              <Button
                variant="outline"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              >
                Load More
              </Button>
            )}

            {visibleCount > PAGE_SIZE && (
              <Button
                variant="outline"
                onClick={() => setVisibleCount(PAGE_SIZE)}
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
