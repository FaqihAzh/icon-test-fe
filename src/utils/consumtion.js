export const calculateConsumption = (startTime, endTime, masterConsumptions) => {
  if (!startTime || !endTime || !masterConsumptions || masterConsumptions.length === 0) {
    return [];
  }

  const selectedConsumptions = [];
  
  // Helper: Konversi waktu HH:MM ke menit (dari 00:00)
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  
  // Definisi Batasan Waktu dalam Menit
  const MORNING_SNACK_BOUNDARY = 11 * 60; // 11:00 (Batas akhir penyediaan Snack Pagi)
  const LUNCH_START_BOUNDARY = 11 * 60;   // 11:00 (Batas awal penyediaan Makan Siang)
  const LUNCH_END_BOUNDARY = 14 * 60;     // 14:00 (Batas akhir penyediaan Makan Siang/Awal Snack Sore)

  // Helper untuk mencari konsumsi berdasarkan nama
  const findConsumption = (keyword) => {
    return masterConsumptions.find(k => k.name.toLowerCase().includes(keyword.toLowerCase()));
  };
  
  // Rule 1: Morning Snack
  // Diberikan jika meeting dimulai sebelum batas akhir snack pagi (11:00)
  const morningSnack = findConsumption('snack pagi') || findConsumption('snack');
  if (startMinutes < MORNING_SNACK_BOUNDARY && morningSnack) {
    selectedConsumptions.push(morningSnack);
  }
  
  // Rule 2: Lunch (Makan Siang)
  // Diberikan jika periode meeting BERIRISAN dengan jam makan siang (11:00 - 14:00)
  const lunch = findConsumption('makan siang');
  const overlapsLunchWindow = (startMinutes < LUNCH_END_BOUNDARY) && (endMinutes > LUNCH_START_BOUNDARY);
  
  if (overlapsLunchWindow && lunch) {
    if (!selectedConsumptions.find(k => k.id === lunch.id)) {
      selectedConsumptions.push(lunch);
    }
  }
  
  // Rule 3: Afternoon Snack (Snack Sore)
  // Diberikan jika meeting selesai SETELAH batas waktu makan siang (14:00)
  const afternoonSnack = findConsumption('snack sore') || findConsumption('snack');
  if (endMinutes > LUNCH_END_BOUNDARY && afternoonSnack) {
    // Pastikan tidak menduplikasi jika hanya ada 'snack' generik yang sudah dimasukkan
    if (!selectedConsumptions.find(k => k.id === afternoonSnack.id)) {
      selectedConsumptions.push(afternoonSnack);
    }
  }
  
  return selectedConsumptions;
};

export const calculateNominal = (participantsCount, consumptionList) => {
  if (!participantsCount || !consumptionList || consumptionList.length === 0) {
    return 0;
  }
  
  // Hitung total harga per orang (penjumlahan maxPrice dari semua jenis konsumsi)
  const totalPricePerPerson = consumptionList.reduce((sum, consumption) => {
    return sum + (consumption.maxPrice || 0);
  }, 0);
  
  return participantsCount * totalPricePerPerson;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};