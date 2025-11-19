import { useState, useEffect } from 'react';
import { masterDataService } from '../lib/api';
import { calculateConsumption, calculateNominal, validateBookingForm } from '../lib/utils';

export const useBookingForm = () => {
  const [masterOffices, setMasterOffices] = useState([]);
  const [masterRooms, setMasterRooms] = useState([]);
  const [masterKonsumsi, setMasterKonsumsi] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [kapasitas, setKapasitas] = useState(0);
  const [selectedKonsumsi, setSelectedKonsumsi] = useState([]);
  const [nominal, setNominal] = useState(0);

  const [formData, setFormData] = useState({
    unitId: '',
    roomId: '',
    tanggalRapat: '',
    waktuMulai: '',
    waktuSelesai: '',
    jumlahPeserta: '0',
  });

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        setLoading(true);
        const [offices, rooms, konsumsi] = await Promise.all([
          masterDataService.getOffices(),
          masterDataService.getMeetingRooms(),
          masterDataService.getConsumptionTypes(),
        ]);

        setMasterOffices(offices);
        setMasterRooms(rooms);
        setMasterKonsumsi(konsumsi);
      } catch (err) {
        console.error('Error loading master data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMasterData();
  }, []);

  useEffect(() => {
    if (formData.unitId) {
      const filtered = masterRooms.filter(r => r.officeId === formData.unitId);
      setFilteredRooms(filtered);

      if (formData.roomId) {
        const stillValid = filtered.find(r => r.id === formData.roomId);
        if (!stillValid) {
          setFormData(prev => ({ ...prev, roomId: '' }));
          setKapasitas(0);
        }
      }
    } else {
      setFilteredRooms([]);
    }
  }, [formData.unitId, masterRooms, formData.roomId]);

  useEffect(() => {
    if (formData.roomId) {
      const room = masterRooms.find(r => r.id === formData.roomId);
      setKapasitas(room?.capacity || 0);
    } else {
      setKapasitas(0);
    }
  }, [formData.roomId, masterRooms]);

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

  const timeToMinutes = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const validate = () => {
    let newErrors = validateBookingForm(formData, kapasitas);

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    const selectedDate = formData.tanggalRapat;
    const isToday = selectedDate === todayStr;

    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const mulai = timeToMinutes(formData.waktuMulai);
    const selesai = timeToMinutes(formData.waktuSelesai);

    // Jika tanggal hari ini → mulai tidak boleh lewat waktu sekarang
    if (isToday && mulai < nowMinutes) {
      newErrors.waktuMulai = "Waktu mulai tidak boleh kurang dari waktu saat ini.";
    }

    // Jika tanggal hari ini → selesai tidak boleh lewat waktu sekarang
    if (isToday && selesai < nowMinutes) {
      newErrors.waktuSelesai = "Waktu selesai tidak boleh kurang dari waktu saat ini.";
    }

    // Waktu selesai harus > waktu mulai
    if (mulai && selesai && selesai <= mulai) {
      newErrors.waktuSelesai = "Waktu selesai harus lebih besar dari waktu mulai.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  return {
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
  };
};
