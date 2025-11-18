import { TIME_BOUNDARIES } from '../../config/constants';

const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const findConsumption = (masterConsumptions, keyword) => {
  return masterConsumptions.find(k => 
    k.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const calculateConsumption = (startTime, endTime, masterConsumptions) => {
  if (!startTime || !endTime || !masterConsumptions?.length) {
    return [];
  }

  const selectedConsumptions = [];
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  // Morning Snack
  const morningSnack = findConsumption(masterConsumptions, 'snack pagi') || 
                       findConsumption(masterConsumptions, 'snack');
  if (startMinutes < TIME_BOUNDARIES.MORNING_SNACK && morningSnack) {
    selectedConsumptions.push(morningSnack);
  }

  // Lunch
  const lunch = findConsumption(masterConsumptions, 'makan siang');
  const overlapsLunchWindow = 
    startMinutes < TIME_BOUNDARIES.LUNCH_END && 
    endMinutes > TIME_BOUNDARIES.LUNCH_START;
  
  if (overlapsLunchWindow && lunch) {
    if (!selectedConsumptions.find(k => k.id === lunch.id)) {
      selectedConsumptions.push(lunch);
    }
  }

  // Afternoon Snack
  const afternoonSnack = findConsumption(masterConsumptions, 'snack sore') || 
                         findConsumption(masterConsumptions, 'snack');
  if (endMinutes > TIME_BOUNDARIES.LUNCH_END && afternoonSnack) {
    if (!selectedConsumptions.find(k => k.id === afternoonSnack.id)) {
      selectedConsumptions.push(afternoonSnack);
    }
  }

  return selectedConsumptions;
};

export const calculateNominal = (participantsCount, consumptionList) => {
  if (!participantsCount || !consumptionList?.length) {
    return 0;
  }

  const totalPricePerPerson = consumptionList.reduce(
    (sum, consumption) => sum + (consumption.maxPrice || 0),
    0
  );

  return participantsCount * totalPricePerPerson;
};