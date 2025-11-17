import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Checkbox } from "../components/ui/Checkbox";
import { ChevronLeft, Calendar } from "lucide-react";
import { api } from "../services/api";
import { calculateKonsumsi, calculateNominal, formatCurrency } from "../utils/consumtion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const BookingFormPage = () => { // Hapus prop onNavigate
  const navigate = useNavigate(); // Gunakan hook useNavigate

  // State untuk master data
  const [masterOffices, setMasterOffices] = useState([]);
  const [masterRooms, setMasterRooms] = useState([]);
  const [masterKonsumsi, setMasterKonsumsi] = useState([]);
  
  // State untuk form
  const [formData, setFormData] = useState({
    unitId: "",
    roomId: "",
    tanggalRapat: "",
    waktuMulai: "",
    waktuSelesai: "",
    jumlahPeserta: "",
  });
  
  // State untuk konsumsi dan nominal
  const [selectedKonsumsi, setSelectedKonsumsi] = useState([]);
  const [nominal, setNominal] = useState(0);
  const [kapasitas, setKapasitas] = useState(0);
  
  // State untuk error
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Filtered rooms berdasarkan unit
  const [filteredRooms, setFilteredRooms] = useState([]);

  // Load master data
  useEffect(() => {
    const loadMasterData = async () => {
      try {
        setLoading(true);
        const [offices, rooms, konsumsi] = await Promise.all([
          api.getMasterOffice(),
          api.getMasterMeetingRooms(),
          api.getMasterJenisKonsumsi(),
        ]);
        
        setMasterOffices(offices);
        setMasterRooms(rooms);
        setMasterKonsumsi(konsumsi);
      } catch (error) {
        console.error("Error loading master data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadMasterData();
  }, []);

  // Filter rooms berdasarkan unit
  useEffect(() => {
    if (formData.unitId) {
      const filtered = masterRooms.filter(
        room => room.officeId === formData.unitId
      );
      setFilteredRooms(filtered);
      
      // Reset room selection jika unit berubah
      if (formData.roomId) {
        const roomStillValid = filtered.find(r => r.id === formData.roomId);
        if (!roomStillValid) {
          setFormData(prev => ({ ...prev, roomId: "" }));
          setKapasitas(0);
        }
      }
    } else {
      setFilteredRooms([]);
    }
  }, [formData.unitId, masterRooms, formData.roomId]);

  // Update kapasitas ketika room dipilih
  useEffect(() => {
    if (formData.roomId) {
      const room = masterRooms.find(r => r.id === formData.roomId);
      if (room) {
        setKapasitas(room.capacity);
      }
    } else {
      setKapasitas(0);
    }
  }, [formData.roomId, masterRooms]);

  // Calculate konsumsi otomatis berdasarkan waktu
  useEffect(() => {
    if (formData.waktuMulai && formData.waktuSelesai) {
      const konsumsi = calculateKonsumsi(
        formData.waktuMulai,
        formData.waktuSelesai,
        masterKonsumsi
      );
      setSelectedKonsumsi(konsumsi);
    } else {
      setSelectedKonsumsi([]);
    }
  }, [formData.waktuMulai, formData.waktuSelesai, masterKonsumsi]);

  // Calculate nominal otomatis
  useEffect(() => {
    if (formData.jumlahPeserta && selectedKonsumsi.length > 0) {
      const total = calculateNominal(
        parseInt(formData.jumlahPeserta) || 0,
        selectedKonsumsi
      );
      setNominal(total);
    } else {
      setNominal(0);
    }
  }, [formData.jumlahPeserta, selectedKonsumsi]);

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Validasi tanggal
    if (formData.tanggalRapat) {
      const selectedDate = new Date(formData.tanggalRapat);
      selectedDate.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.tanggalRapat = "Tanggal tidak boleh kurang dari hari ini";
      }
    } else {
      newErrors.tanggalRapat = "Tanggal rapat harus diisi";
    }

    // Validasi waktu
    if (formData.waktuMulai && formData.waktuSelesai) {
      const [jamMulai, menitMulai] = formData.waktuMulai.split(':').map(Number);
      const [jamSelesai, menitSelesai] = formData.waktuSelesai.split(':').map(Number);
      
      const waktuMulaiMenit = jamMulai * 60 + menitMulai;
      const waktuSelesaiMenit = jamSelesai * 60 + menitSelesai;
      
      if (waktuMulaiMenit >= waktuSelesaiMenit) {
        newErrors.waktuSelesai = "Waktu selesai harus lebih besar dari waktu mulai";
      }
    } else {
      if (!formData.waktuMulai) newErrors.waktuMulai = "Waktu mulai harus diisi";
      if (!formData.waktuSelesai) newErrors.waktuSelesai = "Waktu selesai harus diisi";
    }

    // Validasi jumlah peserta
    if (formData.jumlahPeserta) {
      const peserta = parseInt(formData.jumlahPeserta);
      if (peserta > kapasitas) {
        newErrors.jumlahPeserta = `Jumlah peserta tidak boleh lebih dari kapasitas ruangan (${kapasitas})`;
      }
    } else {
      newErrors.jumlahPeserta = "Jumlah peserta harus diisi";
    }

    // Validasi field lainnya
    if (!formData.unitId) newErrors.unitId = "Unit harus dipilih";
    if (!formData.roomId) newErrors.roomId = "Ruang meeting harus dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", {
        ...formData,
        konsumsi: selectedKonsumsi,
        nominal,
      });
      alert("Pemesanan berhasil disimpan!");
      navigate('/'); // Navigasi ke halaman daftar
    }
  };

  const handleCancel = () => {
    navigate('/'); // Navigasi ke halaman daftar
  };

  if (loading) {
    return (
      <Layout title="Ruang Meeting" subtitle="Ruang Meeting > Pesan Ruangan">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Ruang Meeting" subtitle="Ruang Meeting > Pesan Ruangan">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center gap-3">
          <button 
            onClick={handleCancel}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Pengajuan Perangkat</h2>
        </div>

        {/* Breadcrumb */}
        <div className="px-6 py-3 border-b">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Pengajuan Perangkat</span>
            <span>›</span>
            <span className="text-gray-900">Pengajuan Baru</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Informasi Ruang Meeting */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi Ruang Meeting</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <Select
                  value={formData.unitId}
                  onChange={(e) => setFormData({ ...formData, unitId: e.target.value })}
                  error={errors.unitId}
                  placeholder="Pilih Unit"
                >
                  {masterOffices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.name}
                    </option>
                  ))}
                </Select>
                {errors.unitId && (
                  <p className="text-red-500 text-xs mt-1">{errors.unitId}</p>
                )}
              </div>

              {/* Ruang Meeting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ruang Meeting
                </label>
                <Select
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  error={errors.roomId}
                  placeholder="Pilih Ruang Meeting"
                  disabled={!formData.unitId}
                >
                  {filteredRooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </Select>
                {errors.roomId && (
                  <p className="text-red-500 text-xs mt-1">{errors.roomId}</p>
                )}
              </div>

              {/* Kapasitas */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kapasitas
                </label>
                <Input
                  type="number"
                  value={kapasitas}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Informasi Rapat */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi Rapat</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tanggal Rapat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Rapat <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.tanggalRapat}
                    onChange={(e) => setFormData({ ...formData, tanggalRapat: e.target.value })}
                    error={errors.tanggalRapat}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.tanggalRapat && (
                  <p className="text-red-500 text-xs mt-1">{errors.tanggalRapat}</p>
                )}
              </div>

              {/* Waktu Mulai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waktu Mulai
                </label>
                <Select
                  value={formData.waktuMulai}
                  onChange={(e) => setFormData({ ...formData, waktuMulai: e.target.value })}
                  error={errors.waktuMulai}
                  placeholder="Pilih Waktu Mulai"
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return (
                      <option key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </option>
                    );
                  })}
                </Select>
                {errors.waktuMulai && (
                  <p className="text-red-500 text-xs mt-1">{errors.waktuMulai}</p>
                )}
              </div>

              {/* Waktu Selesai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waktu Selesai
                </label>
                <Select
                  value={formData.waktuSelesai}
                  onChange={(e) => setFormData({ ...formData, waktuSelesai: e.target.value })}
                  error={errors.waktuSelesai}
                  placeholder="Pilih Waktu Selesai"
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const hour = i.toString().padStart(2, '0');
                    return (
                      <option key={hour} value={`${hour}:00`}>
                        {hour}:00
                      </option>
                    );
                  })}
                </Select>
                {errors.waktuSelesai && (
                  <p className="text-red-500 text-xs mt-1">{errors.waktuSelesai}</p>
                )}
              </div>

              {/* Jumlah Peserta */}
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Peserta
                </label>
                <Input
                  type="number"
                  value={formData.jumlahPeserta}
                  onChange={(e) => setFormData({ ...formData, jumlahPeserta: e.target.value })}
                  error={errors.jumlahPeserta}
                  placeholder="Masukkan Jumlah Peserta"
                  min="1"
                  max={kapasitas}
                />
                {errors.jumlahPeserta && (
                  <p className="text-red-500 text-xs mt-1">{errors.jumlahPeserta}</p>
                )}
              </div>
            </div>
          </div>

          {/* Konsumsi Rapat */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Konsumsi Rapat</h3>
            
            <div className="space-y-3">
              {masterKonsumsi.map((konsumsi) => {
                const isSelected = selectedKonsumsi.find(k => k.id === konsumsi.id);
                return (
                  <div key={konsumsi.id} className="flex items-center gap-3">
                    <Checkbox
                      checked={!!isSelected}
                      disabled
                    />
                    <label className="text-sm text-gray-700">
                      {konsumsi.name}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nominal Konsumsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nominal Konsumsi
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                Rp.
              </span>
              <Input
                type="text"
                value={nominal.toLocaleString('id-ID')}
                disabled
                className="bg-gray-100 pl-12"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Batal
            </Button>
            <Button type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};