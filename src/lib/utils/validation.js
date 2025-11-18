export const validateBookingForm = (formData, capacity) => {
  const errors = {};

  if (!formData.unitId) {
    errors.unitId = 'Unit harus dipilih';
  }

  if (!formData.roomId) {
    errors.roomId = 'Ruang meeting harus dipilih';
  }

  if (!formData.tanggalRapat) {
    errors.tanggalRapat = 'Tanggal rapat harus diisi';
  }

  if (!formData.waktuMulai) {
    errors.waktuMulai = 'Waktu mulai harus diisi';
  }

  if (!formData.waktuSelesai) {
    errors.waktuSelesai = 'Waktu selesai harus diisi';
  }

  if (formData.waktuMulai && formData.waktuSelesai) {
    const [h1, m1] = formData.waktuMulai.split(':').map(Number);
    const [h2, m2] = formData.waktuSelesai.split(':').map(Number);
    if (h1 * 60 + m1 >= h2 * 60 + m2) {
      errors.waktuSelesai = 'Waktu selesai harus lebih besar dari waktu mulai';
    }
  }

  if (!formData.jumlahPeserta) {
    errors.jumlahPeserta = 'Jumlah peserta harus diisi';
  } else if (parseInt(formData.jumlahPeserta) > capacity) {
    errors.jumlahPeserta = `Peserta melebihi kapasitas (${capacity})`;
  }

  return errors;
};