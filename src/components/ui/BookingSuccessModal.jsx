import { CheckCircle, X, Calendar, Clock, Users, MapPin, Coffee, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { formatCurrency } from '../../lib/utils';

export const BookingSuccessModal = ({ isOpen, onClose, bookingData }) => {
  if (!isOpen) return null;

  const dateData = (date) => {
    try {
      if (!date) return "Tanggal Rapat";
      return format(new Date(date), "dd MMMM yyyy");
    } catch {
      return "Tanggal Rapat";
    }
  };

  const timeData = () => {
    if (!bookingData?.waktuMulai || !bookingData?.waktuSelesai) return "Waktu Rapat";
    return `${bookingData?.waktuMulai} - ${bookingData?.waktuSelesai}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text-primary/70 bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slideUp">
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <CheckCircle size={48} className="text-green-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Pemesanan Sukses!
          </h2>
          <p className="text-gray-600 text-sm">
            Ruang meeting berhasil dipesan
          </p>
        </div>

        <hr className="text-hr bg-hr max-w-[80%] mx-auto" />

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-text-primary mb-3 border-b pb-2 border-hr">
              Detail Pemesanan
            </h3>

            {/* Unit & Ruangan */}
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Unit & Ruangan</p>
                <p className="text-xs font-medium text-text-primary my-0.5">
                  {bookingData?.unitName || "Unit Name"}
                </p>
                <p className="text-sm text-gray-600">
                  {bookingData?.roomName || "Room Name"}
                </p>
              </div>
            </div>

            {/* Kapasitas */}
            <div className="flex items-start gap-3">
              <Users size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Kapasitas Ruangan</p>
                <p className="text-sm font-medium text-text-primary">
                  {bookingData?.kapasitas || "-"} orang
                </p>
              </div>
            </div>

            {/* Tanggal */}
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Tanggal Rapat</p>
                <p className="text-sm font-medium text-text-primary">
                  {dateData(bookingData?.tanggalRapat)}
                </p>
              </div>
            </div>

            {/* Waktu */}
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Waktu</p>
                <p className="text-sm font-medium text-text-primary">
                  {timeData()}
                </p>
              </div>
            </div>

            {/* Jumlah Peserta */}
            <div className="flex items-start gap-3">
              <Users size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-gray-500">Jumlah Peserta</p>
                <p className="text-sm font-medium text-text-primary">
                  {bookingData?.jumlahPeserta || "-"} orang
                </p>
              </div>
            </div>

            {/* Konsumsi */}
            {Array.isArray(bookingData?.konsumsi) &&
              bookingData?.konsumsi.length > 0 && (
                <div className="flex items-start gap-3">
                  <Coffee size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Konsumsi</p>
                    <ul className="space-y-1">
                      {bookingData.konsumsi.map((item, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {item.name || "Item"}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            {/* Nominal */}
            {bookingData?.nominal ? (
              <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                <DollarSign size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Total Biaya Konsumsi</p>
                  <p className="font-bold text-lg text-secondary-500">
                    {formatCurrency(bookingData.nominal)}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              <strong>Catatan:</strong> Anda telah berhasil melakukan pemesanan ruang meeting. Silahkan gunakan ruang sesuai dengan jadwal yang telah ditentukan. Terima kasih.
            </p>
          </div>
        </div>

        <hr className="text-hr bg-hr max-w-[80%] mx-auto" />

        <div className="p-6">
          <button
            onClick={onClose}
            className="w-full bg-secondary-500 hover:bg-primary-500 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
