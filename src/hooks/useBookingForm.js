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

  // Load master data
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

  // Filter rooms based on selected unit
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

  // Set capacity when room is selected
  useEffect(() => {
    if (formData.roomId) {
      const room = masterRooms.find(r => r.id === formData.roomId);
      setKapasitas(room?.capacity || 0);
    } else {
      setKapasitas(0);
    }
  }, [formData.roomId, masterRooms]);

  // Calculate consumption automatically
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

  // Calculate nominal automatically
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

  const validate = () => {
    const newErrors = validateBookingForm(formData, kapasitas);
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
