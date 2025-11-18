import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Select } from '../components/ui/Select';
import { api } from '../services/api';
import { formatCurrency } from '../utils/consumtion';
import GenIcon from '../assets/icons/generation.svg';
import { TruncatePopup } from '../components/ui/TruncatePopup';
import { EmptyState } from '../components/ui/EmptyState';

export const DashboardPage = () => {
  const breadCrumbs = [{ label: 'Dashboard', href: '/' }];

  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('Jan-2024');

  const periodOptions = [
    { value: 'Jan-2024', label: 'Januari 2024' },
    { value: 'Feb-2024', label: 'Februari 2024' },
    { value: 'Mar-2024', label: 'Maret 2024' },
  ];

  const filteredData = summaryData
  .filter((item) => item.period === selectedPeriod)
  .flatMap((item) => item.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getSummaryBookings();
        setSummaryData(data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateUsagePercentage = (avg) => Math.min(Math.max(parseInt(avg) || 0, 0), 100);

  const totalCost = (arr) =>
    Array.isArray(arr) ? arr.reduce((s, i) => s + (parseInt(i.totalPrice) || 0), 0) : 0;

  const pkgByName = (arr, name) => {
    const it = arr?.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));
    return parseInt(it?.totalPackage) || 0;
  };

  const maxPkg = (arr) => {
    if (!Array.isArray(arr)) return 1;
    const nums = arr.map((c) => parseInt(c.totalPackage) || 0);
    return Math.max(...nums, 1);
  };

  const renderProgressBar = (value, max, label) => {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="space-y-1 grid grid-cols-2">
        <div className="flex h-full items-center text-[10px]">
          <span className="text-[#333333] font-medium">{label}</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-[#333333] text-[11px]">{value}</span>
          <div className="w-full bg-[#CCCCCC] rounded-sm">
            <div className="bg-[#00A3E9] h-2 rounded-sm" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" breadCrumbs={breadCrumbs}>
      <div className="space-y-6">
        <div className="max-w-xs">
          <Select isPrimary={false} label="Periode" value={selectedPeriod} onChange={setSelectedPeriod} options={periodOptions} />
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : filteredData.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {summaryData
              .filter((item) => item.period === selectedPeriod)
              .flatMap((item) => item.data)
              .map((office, idx) => (
                <div key={idx} className="space-y-4 break-inside-avoid">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center gap-3 relative">
                      <img src={GenIcon} alt="icon" className="w-8 h-8" />
                      <TruncatePopup text={office.officeName} className="flex-1 min-w-0" />
                    </div>
                  </div>


                  {office.detailSummary?.map((room, rIdx) => {
                    const usage = calculateUsagePercentage(room.averageOccupancyPerMonth);
                    const cost = totalCost(room.totalConsumption);
                    const max = maxPkg(room.totalConsumption);

                    const ss = pkgByName(room.totalConsumption, 'snack siang');
                    const ms = pkgByName(room.totalConsumption, 'makan siang');
                    const sore = pkgByName(room.totalConsumption, 'snack sore');

                    const r = 20;
                    const c = 2 * Math.PI * r;
                    const offset = c * (1 - usage / 100);

                    return (
                      <div key={rIdx} className="bg-[#F2F2F2] rounded-lg shadow-sm p-4">
                        <h4 className="text-sm font-normal text-[#4E4E4E]">{room.roomName}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-xs text-[#625B71] 2xl:hidden">% Pemakaian</p>
                            <p className="text-xs text-[#625B71] hidden 2xl:block">Persentase Pemakaian</p>
                            <p className="text-xl font-bold text-[#333333]">{usage}%</p>
                          </div>
                          <svg className="w-18 h-18 -rotate-90">
                            <circle cx="33" cy="48" r={r} stroke="#CCCCCC" strokeWidth="8" fill="none" />
                            <circle
                              cx="33"
                              cy="48"
                              r={r}
                              stroke="#00AEEF"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={c}
                              strokeDashoffset={offset}
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>

                        <div className="mt-2 mb-3">
                          <p className="text-xs text-[#625B71]">Nominal Konsumsi</p>
                          <p className="text-xl font-bold text-[#333333] mt-0.5">{formatCurrency(cost)}</p>
                        </div>

                        <div className="space-y-2">
                          {renderProgressBar(ss, max, 'Snack Siang')}
                          {renderProgressBar(ms, max, 'Makan Siang')}
                          {renderProgressBar(sore, max, 'Snack Sore')}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        ) : (
          <EmptyState
            title="No Data Found"
            description={`No summary data available for ${selectedPeriod}`}
            icon={<GenIcon className="w-12 h-12 text-gray-400" />}
          />
        )}
      </div>
    </Layout>
  );
};