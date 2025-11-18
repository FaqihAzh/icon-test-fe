import { useEffect, useState } from 'react';
import { Layout } from '../components/layout';
import { Select } from '../components/ui/Select';
import { EmptyState } from '../components/ui/EmptyState';
import { TruncatePopup } from '../components/ui/TruncatePopup';
import { PageLoader } from '../components/ui/Loader';
import { bookingService } from '../lib/api';
import { formatCurrency } from '../lib/utils';
import GenIcon from '../assets/icons/generation.svg';

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
    .filter(item => item.period === selectedPeriod)
    .flatMap(item => item.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getSummary();
        setSummaryData(data);
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const calculateUsagePercentage = (avg) => 
    Math.min(Math.max(parseInt(avg) || 0, 0), 100);

  const totalCost = (arr) =>
    Array.isArray(arr) ? arr.reduce((s, i) => s + (parseInt(i.totalPrice) || 0), 0) : 0;

  const pkgByName = (arr, name) => {
    const it = arr?.find(c => c.name.toLowerCase().includes(name.toLowerCase()));
    return parseInt(it?.totalPackage) || 0;
  };

  const maxPkg = (arr) => {
    if (!Array.isArray(arr)) return 1;
    const nums = arr.map(c => parseInt(c.totalPackage) || 0);
    return Math.max(...nums, 1);
  };

  const renderProgressBar = (value, max, label) => {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
      <div className="space-y-1 grid grid-cols-2">
        <div className="flex h-full items-center text-[10px]">
          <span className="text-text-primary font-medium">{label}</span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-text-primary text-[11px]">{value}</span>
          <div className="w-full bg-gray-300 rounded-sm">
            <div 
              className="bg-accent-500 h-2 rounded-sm" 
              style={{ width: `${pct}%` }} 
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Dashboard" breadCrumbs={breadCrumbs}>
      <div className="space-y-6">
        <div className="max-w-xs">
          <Select 
            isPrimary={false} 
            label="Periode" 
            value={selectedPeriod} 
            onChange={setSelectedPeriod} 
            options={periodOptions} 
          />
        </div>

        {loading ? (
          <PageLoader text="Memuat data dashboard..." />
        ) : filteredData.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {filteredData.map((office, idx) => (
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
                    <div key={rIdx} className="bg-gray-100 rounded-lg shadow-sm p-4">
                      <h4 className="text-sm font-normal text-gray-700">{room.roomName}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-xs text-gray-600 2xl:hidden">% Pemakaian</p>
                          <p className="text-[11.5px] text-gray-600 hidden 2xl:block">
                            Persentase Pemakaian
                          </p>
                          <p className="text-xl font-bold text-text-primary">{usage}%</p>
                        </div>
                        <svg className="w-18 h-18 -rotate-90">
                          <circle 
                            cx="33" 
                            cy="48" 
                            r={r} 
                            stroke="#CCCCCC" 
                            strokeWidth="8" 
                            fill="none" 
                          />
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
                        <p className="text-xs text-gray-600">Nominal Konsumsi</p>
                        <p className="text-xl font-bold text-text-primary mt-0.5">
                          {formatCurrency(cost)}
                        </p>
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
            title="Data Tidak Tersedia"
            description={`Tidak ada ada tersedia pada periode ${selectedPeriod}`}
          />
        )}
      </div>
    </Layout>
  );
};
