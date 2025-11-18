import { ChevronDown } from 'lucide-react';
import { APP_CONFIG } from '../../config/constants';
import IconLogo from '../../assets/images/icon-logo.png';
import MegaphoneIcon from '../../assets/icons/megaphone.svg';
import BellIcon from '../../assets/icons/notify.svg';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-secondary-700 text-white px-4 md:px-6 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-20">
      <div className="flex items-center gap-4">
        <img src={IconLogo} alt="Logo" className="w-9 h-auto" />
        <div className="text-base font-bold">{APP_CONFIG.APP_NAME}</div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button className="bg-secondary-600 hover:bg-opacity-80 px-3 py-2.5 rounded-lg flex items-center cursor-pointer">
          <img src={MegaphoneIcon} alt="Aduan" className="w-5 h-5 inline-block mr-2" />
          <span className="text-sm font-semibold text-white hidden md:block">
            Kontak Aduan
          </span>
        </button>
        <button className="hover:bg-opacity-80 p-2 rounded cursor-pointer">
          <img src={BellIcon} alt="Notifications" className="w-5 h-auto" />
        </button>
        <div className="flex items-center gap-3 hover:bg-opacity-80 rounded cursor-pointer">
          <div className="w-7 h-7 rounded-full">
            <img src="https://res.cloudinary.com/dxrz0cg5z/image/upload/v1736253508/WhatsApp_Pp_xmqdq8.jpg" alt="User Profile" className='rounded-full' />
          </div>
          <span className="text-sm font-semibold hidden md:inline">Faqih Azh</span>
          <ChevronDown className="-ml-1 w-4 h-4" />
        </div>
      </div>
    </header>
  );
};
