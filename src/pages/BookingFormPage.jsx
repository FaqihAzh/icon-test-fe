import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select"; // <-- Select sudah update
import { Checkbox } from "../components/ui/Checkbox";
import { Calendar } from "lucide-react";
import { api } from "../services/api";
import { calculateConsumption, calculateNominal } from "../utils/consumtion";
import { useNavigate } from "react-router-dom";
import { CurrencyInput } from "../components/ui/CurrencyInput";

export const BookingFormPage = () => {
  const navigate = useNavigate();

  const breadCrumbs = [
    { label: "Ruang Meeting", href: "/ruang-meeting" },
    { label: "Pengajuan Perangkat", href: "/ruang-meeting/pengajuan-perangkat" },
  ];

  // Master data state
  const [masterOffices, setMasterOffices] = useState([]);
  const [masterRooms, setMasterRooms] = useState([]);
  const [masterKonsumsi, setMasterKonsumsi] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    unitId: "",
    roomId: "",
    tanggalRapat: "",
    waktuMulai: "",
    waktuSelesai: "",
    jumlahPeserta: "0",
  });

  // Konsumsi & nominal
  const [selectedKonsumsi, setSelectedKonsumsi] = useState([]);
  const [nominal, setNominal] = useState(0);
  const [kapasitas, setKapasitas] = useState(0);

  // Other states
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const unitOptions = masterOffices.map(o => ({ value: o.id, label: o.officeName }));
  const roomOptions = filteredRooms.map(r => ({ value: r.id, label: r.roomName }));
  const timeOptions = Array.from({ length: 24 }).map((_, i) => {
    const time = String(i).padStart(2, "0") + ":00";
    return { value: time, label: time };
  });

  const isFormFilled = () => {
    return (
      formData.unitId &&
      formData.roomId &&
      formData.tanggalRapat &&
      formData.waktuMulai &&
      formData.waktuSelesai &&
      formData.jumlahPeserta
    );
  };

  // Load master data
  useEffect(() => {
    const loadMaster = async () => {
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
      } catch (err) {
        console.error("Error master:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMaster();
  }, []);

  // Filter room berdasarkan unit
  useEffect(() => {
    if (formData.unitId) {
      const filtered = masterRooms.filter((r) => r.officeId === formData.unitId);
      setFilteredRooms(filtered);

      // Reset jika tidak valid
      if (formData.roomId) {
        const stillValid = filtered.find((r) => r.id === formData.roomId);
        if (!stillValid) {
          setFormData((prev) => ({ ...prev, roomId: "" }));
          setKapasitas(0);
        }
      }
    } else {
      setFilteredRooms([]);
    }
  }, [formData.unitId, masterRooms, formData.roomId]);

  // Set kapasitas otomatis saat room dipilih
  useEffect(() => {
    if (formData.roomId) {
      const room = masterRooms.find((r) => r.id === formData.roomId);
      setKapasitas(room?.capacity || 0);
    } else {
      setKapasitas(0);
    }
  }, [formData.roomId, masterRooms]);

  // Hitung konsumsi otomatis
  useEffect(() => {
    if (formData.waktuMulai && formData.waktuSelesai) {
      const hasil = calculateConsumption(
        formData.waktuMulai,
        formData.waktuSelesai,
        masterKonsumsi
      );
      setSelectedKonsumsi(hasil);
    } else {
      setSelectedKonsumsi([]);
    }
  }, [formData.waktuMulai, formData.waktuSelesai, masterKonsumsi]);

  // Hitung nominal otomatis
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

  // Validasi
  const validateForm = () => {
    const newErrors = {};

    if (!formData.unitId) newErrors.unitId = "Unit harus dipilih";
    if (!formData.roomId) newErrors.roomId = "Ruang meeting harus dipilih";

    if (!formData.tanggalRapat) {
      newErrors.tanggalRapat = "Tanggal rapat harus diisi";
    }

    if (!formData.waktuMulai) newErrors.waktuMulai = "Waktu mulai harus diisi";
    if (!formData.waktuSelesai) newErrors.waktuSelesai = "Waktu selesai harus diisi";

    if (formData.waktuMulai && formData.waktuSelesai) {
      const [h1, m1] = formData.waktuMulai.split(":").map(Number);
      const [h2, m2] = formData.waktuSelesai.split(":").map(Number);
      if (h1 * 60 + m1 >= h2 * 60 + m2) {
        newErrors.waktuSelesai = "Waktu selesai harus lebih besar dari waktu mulai";
      }
    }

    if (!formData.jumlahPeserta) {
      newErrors.jumlahPeserta = "Jumlah peserta harus diisi";
    } else if (parseInt(formData.jumlahPeserta) > kapasitas) {
      newErrors.jumlahPeserta = `Peserta melebihi kapasitas (${kapasitas})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Submit:", {
      ...formData,
      konsumsi: selectedKonsumsi,
      nominal,
    });

    alert("Pemesanan berhasil disimpan!");
    navigate("/");
  };

  const handleCancel = () => navigate("/ruang-meeting");

  if (loading) {
    return (
      <Layout title="Ruang Meeting" subtitle="Ruang Meeting › Pesan Ruangan">
        <div className="flex items-center justify-center h-64 text-gray-500">
          Memuat data...
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Pengajuan Perangkat" breadCrumbs={breadCrumbs}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* INFORMASI RUANG */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#333333]">
              Informasi Ruang Meeting
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Unit */}
              <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-[#333333] font-semibold">Unit</label>
                  <Select
                    value={formData.unitId}
                    onChange={(value) => setFormData({ ...formData, unitId: value })}
                    error={errors.unitId}
                    placeholder="Pilih Unit"
                    options={unitOptions}
                    className="w-full"
                  />
                </div>

                {/* Ruang Meeting */}
                <div>
                  <label className="block text-sm mb-2 text-[#333333] font-semibold">Ruang Meeting</label>
                  <Select
                    value={formData.roomId}
                    onChange={(value) => setFormData({ ...formData, roomId: value })}
                    error={errors.roomId}
                    placeholder="Pilih Ruangan"
                    disabled={!formData.unitId}
                    options={roomOptions}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Kapasitas */}
              <div className="col-span-4 md:col-span-1">
                <label className="block text-sm mb-2 text-[#333333] font-semibold">Kapasitas</label>
                <Input disabled value={kapasitas} className="bg-gray-100" />
              </div>

            </div>
          </div>

          <hr className="bg-[#EEEEEE] text-[#EEEEEE] my-9" />

          {/* INFORMASI RAPAT */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#333333]">
              Informasi Rapat
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Tanggal */}
                <div className="space-y-2">
                  <Input
                    label="Pilih Tanggal"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    required
                    leftIcon={<Calendar size={18} />}
                    value={formData.tanggalRapat}
                    onChange={(e) => 
                      setFormData((prev) => ({ ...prev, tanggalRapat: e.target.value }))
                    }
                    error={errors.tanggalRapat} 
                  />
                </div>

                {/* Waktu Mulai */}
                <div>
                  <label className="block text-sm mb-2 text-[#333333] font-semibold">Waktu Mulai</label>
                  <Select
                    value={formData.waktuMulai}
                    onChange={(value) => setFormData({ ...formData, waktuMulai: value })}
                    error={errors.waktuMulai}
                    placeholder="Pilih Waktu Mulai"
                    options={timeOptions}
                    max={formData.waktuSelesai}
                  />
                </div>

                {/* Waktu Selesai */}
                <div>
                  <label className="block text-sm mb-2 text-[#333333] font-semibold">Waktu Selesai</label>
                  <Select
                    value={formData.waktuSelesai}
                    onChange={(value) => setFormData({ ...formData, waktuSelesai: value })}
                    error={errors.waktuSelesai}
                    placeholder="Pilih Waktu Selesai"
                    options={timeOptions}
                    min={formData.waktuMulai}
                  />
                </div>
              </div>
              {/* Peserta */}
              <div className="col-span-4 md:col-span-1">
                <label className="block text-sm mb-2 text-[#333333] font-semibold">Jumlah Peserta</label>
                <Input
                  type="number"
                  value={formData.jumlahPeserta}
                  onChange={(e) =>
                    setFormData({ ...formData, jumlahPeserta: e.target.value })
                  }
                  error={errors.jumlahPeserta}
                  min="1"
                  max={kapasitas}
                />
                {errors.jumlahPeserta && (
                  <p className="text-red-500 text-xs">{errors.jumlahPeserta}</p>
                )}
              </div>

            </div>
          </div>

          {/* KONSUMSI */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-[#333333]">Konsumsi Rapat</h3>
            <div className="space-y-3">
              {masterKonsumsi.map((k) => {
                const isSelected = selectedKonsumsi.find((x) => x.id === k.id);
                return (
                  <div key={k.id} className="flex items-center gap-3">
                    <Checkbox checked={!!isSelected} disabled />
                    <span className="text-sm">{k.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NOMINAL */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="col-span-4 md:col-span-1">
              <CurrencyInput
                label="Nominal Konsumsi"
                value={nominal}
                disabled
              />
            </div>
          </div>

          <hr className="bg-[#EEEEEE] text-[#EEEEEE] my-9" />

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="noOutline" onClick={handleCancel}>
              Batal
            </Button>
            <Button type="submit" disabled={!isFormFilled()}>Simpan</Button>
          </div>

        </form>
      </div>
    </Layout>
  );
};
