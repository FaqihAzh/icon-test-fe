import { Layout } from '../components/layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { CurrencyInput } from '../components/ui/CurrencyInput';
import { PageLoader } from '../components/ui/Loader';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBookingForm } from '../hooks/useBookingForm';
import { BookingSuccessModal } from '../components/ui/BookingSuccessModal';
import { useState } from 'react';

export const BookingFormPage = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const {
    formData,
    setFormData,
    masterOffices,
    masterKonsumsi,
    filteredRooms,
    selectedKonsumsi,
    nominal,
    kapasitas,
    errors,
    loading,
    validate,
    isFormFilled,
  } = useBookingForm();

  const breadCrumbs = [
    { label: 'Ruang Meeting', href: '/ruang-meeting' },
    { label: 'Pesan Ruangan', href: '/ruang-meeting/pesan-ruangan' },
  ];

  const unitOptions = masterOffices.map(o => ({ 
    value: o.id, 
    label: o.officeName 
  }));

  const roomOptions = filteredRooms.map(r => ({ 
    value: r.id, 
    label: r.roomName 
  }));

  const timeOptions = Array.from({ length: 24 }).map((_, i) => {
    const time = String(i).padStart(2, '0') + ':00';
    return { value: time, label: time };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedUnit = masterOffices.find(o => o.id === formData.unitId);
    const selectedRoom = filteredRooms.find(r => r.id === formData.roomId);
    
    const details = {
      unitName: selectedUnit?.officeName || '-',
      roomName: selectedRoom?.roomName || '-',
      kapasitas: kapasitas,
      tanggalRapat: formData.tanggalRapat,
      waktuMulai: formData.waktuMulai,
      waktuSelesai: formData.waktuSelesai,
      jumlahPeserta: formData.jumlahPeserta,
      konsumsi: selectedKonsumsi,
      nominal: nominal,
    };

    setBookingDetails(details);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const handleCancel = () => navigate('/ruang-meeting');

  if (loading) {
    return (
      <Layout title="Ruang Meeting" breadCrumbs={breadCrumbs} showBack={true}>
        <PageLoader text="Memuat data formulir..." />
      </Layout>
    );
  }

  return (
    <Layout title="Pengajuan Perangkat" breadCrumbs={breadCrumbs} showBack={true}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-base font-semibold mb-4 text-text-primary">
              Informasi Ruang Meeting
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Select
                  label="Unit"
                  value={formData.unitId}
                  onChange={(value) => setFormData({ ...formData, unitId: value })}
                  error={errors.unitId}
                  placeholder="Pilih Unit"
                  options={unitOptions}
                />

                <Select
                  label="Ruang Meeting"
                  value={formData.roomId}
                  onChange={(value) => setFormData({ ...formData, roomId: value })}
                  error={errors.roomId}
                  placeholder="Pilih Ruangan"
                  disabled={!formData.unitId}
                  options={roomOptions}
                />
              </div>

              <div className="col-span-4 md:col-span-1">
                <Input 
                  label="Kapasitas" 
                  disabled 
                  value={kapasitas} 
                  className="bg-gray-100" 
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-base font-semibold mb-4 text-text-primary">
              Informasi Rapat
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Input
                  label="Pilih Tanggal"
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  required
                  leftIcon={<Calendar size={18} />}
                  value={formData.tanggalRapat}
                  onChange={(e) => 
                    setFormData(prev => ({ ...prev, tanggalRapat: e.target.value }))
                  }
                  error={errors.tanggalRapat}
                />

                <Select
                  label="Waktu Mulai"
                  value={formData.waktuMulai}
                  onChange={(value) => setFormData({ ...formData, waktuMulai: value })}
                  error={errors.waktuMulai}
                  placeholder="Pilih Waktu Mulai"
                  options={timeOptions}
                />

                <Select
                  label="Waktu Selesai"
                  value={formData.waktuSelesai}
                  onChange={(value) => setFormData({ ...formData, waktuSelesai: value })}
                  error={errors.waktuSelesai}
                  placeholder="Pilih Waktu Selesai"
                  options={timeOptions}
                  min={formData.waktuMulai}
                />
              </div>

              <div className="col-span-4 md:col-span-1">
                <Input
                  label="Jumlah Peserta"
                  type="number"
                  value={formData.jumlahPeserta}
                  onChange={(e) =>
                    setFormData({ ...formData, jumlahPeserta: e.target.value })
                  }
                  error={errors.jumlahPeserta}
                  min="1"
                  max={kapasitas}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4 text-text-primary">
              Konsumsi Rapat
            </h3>
            <div className="space-y-3">
              {masterKonsumsi.map(k => {
                const isSelected = selectedKonsumsi.find(x => x.id === k.id);
                return (
                  <div key={k.id} className="flex items-center gap-3">
                    <Checkbox checked={!!isSelected} disabled />
                    <span className="text-sm">{k.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="col-span-4 md:col-span-1">
              <CurrencyInput
                label="Nominal Konsumsi"
                value={nominal}
                disabled
              />
            </div>
          </div>

          <hr className="border-gray-200" />

          <div className="flex justify-end gap-3">
            <Button type="button" variant="noOutline" onClick={handleCancel}>
              Batal
            </Button>
            <Button type="submit" disabled={!isFormFilled()}>
              Simpan
            </Button>
          </div>
        </form>
      </div>

      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        bookingData={bookingDetails}
      />
    </Layout>
  );
};