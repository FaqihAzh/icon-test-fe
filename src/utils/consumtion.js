// Menghitung jenis konsumsi berdasarkan waktu meeting
export const calculateKonsumsi = (waktuMulai, waktuSelesai, masterKonsumsi) => {
  if (!waktuMulai || !waktuSelesai || !masterKonsumsi || masterKonsumsi.length === 0) {
    return [];
  }

  const konsumsiTerpilih = [];
  
  // Parse waktu
  const [jamMulai, menitMulai] = waktuMulai.split(':').map(Number);
  const [jamSelesai, menitSelesai] = waktuSelesai.split(':').map(Number);
  
  const waktuMulaiMenit = jamMulai * 60 + menitMulai;
  const waktuSelesaiMenit = jamSelesai * 60 + menitSelesai;
  
  // Batasan waktu dalam menit
  const batasSnackPagi = 11 * 60; // 11:00
  const batasMakanSiang = 14 * 60; // 14:00
  
  // Rule 1: Meeting mulai sebelum jam 11.00, mendapat snack pagi
  if (waktuMulaiMenit < batasSnackPagi) {
    const snackPagi = masterKonsumsi.find(k => k.name.toLowerCase().includes('snack siang') || k.name.toLowerCase().includes('snack pagi'));
    if (snackPagi && !konsumsiTerpilih.find(k => k.id === snackPagi.id)) {
      konsumsiTerpilih.push(snackPagi);
    }
  }
  
  // Rule 2: Meeting jam 11.00-14.00, mendapat makan siang
  if ((waktuMulaiMenit >= batasSnackPagi && waktuMulaiMenit < batasMakanSiang) ||
      (waktuSelesaiMenit > batasSnackPagi && waktuSelesaiMenit <= batasMakanSiang) ||
      (waktuMulaiMenit < batasSnackPagi && waktuSelesaiMenit > batasMakanSiang)) {
    const makanSiang = masterKonsumsi.find(k => k.name.toLowerCase().includes('makan siang'));
    if (makanSiang && !konsumsiTerpilih.find(k => k.id === makanSiang.id)) {
      konsumsiTerpilih.push(makanSiang);
    }
  }
  
  // Rule 3: Meeting di atas jam 14.00, mendapat snack sore
  if (waktuSelesaiMenit > batasMakanSiang) {
    const snackSore = masterKonsumsi.find(k => k.name.toLowerCase().includes('snack sore'));
    if (snackSore && !konsumsiTerpilih.find(k => k.id === snackSore.id)) {
      konsumsiTerpilih.push(snackSore);
    }
  }
  
  return konsumsiTerpilih;
};

// Menghitung nominal konsumsi
export const calculateNominal = (jumlahPeserta, konsumsiList) => {
  if (!jumlahPeserta || !konsumsiList || konsumsiList.length === 0) {
    return 0;
  }
  
  const totalHargaPerOrang = konsumsiList.reduce((sum, konsumsi) => {
    return sum + (konsumsi.maxPrice || 0);
  }, 0);
  
  return jumlahPeserta * totalHargaPerOrang;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};