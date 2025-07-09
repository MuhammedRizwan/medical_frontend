'use client';
import {
  HiOutlineSquares2X2,
  HiOutlineVideoCamera,
  HiOutlineCurrencyDollar,
  HiOutlineBell,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';
import { BsChatLeftText } from 'react-icons/bs';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', icon: HiOutlineSquares2X2, path: '/dashboard' },
  { label: 'Start Live', icon: HiOutlineVideoCamera, path: '/startlive' },
  { label: 'Monetization', icon: HiOutlineCurrencyDollar, path: '/monetization' },
  { label: 'Reviews', icon: BsChatLeftText, path: '/reviews' },
  { label: 'Notification', icon: HiOutlineBell, path: '/notifications' },
  { label: 'Settings', icon: HiOutlineCog6Tooth, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
  <aside className="fixed top-0 left-0 z-30 w-20 md:w-64 h-screen bg-white shadow-md flex flex-col justify-between py-2 md:py-5 px-4 border-r-2 border-gray-300">
      <div>
        <div className="mb-10">
         <h1 className="text-blue-600 text-2xl font-medium leading-tight">
          life support <br />
          <div className="flex text-2xl font-medium tracking-wide">
            learning 
            <div>
              <p className='text-xs'>powered by</p>
              <p className='text-xs'>Duty Doctor</p>
            </div>
          </div>
        </h1>
        </div>

        <nav className="space-y-4">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={label}
                href={path}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition hover:text-blue-500 hover:bg-gray-100',
                  isActive
                    ? 'text-blue-500 bg-gray-100 font-bold px-5'
                    : 'text-black font-semibold'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-xl text-xs text-gray-800">
          <span className="hidden md:block text-xl">🥳</span>
          <p className="hidden md:block my-2">
            Upgrade to able to make as many videos as you like{' '}
            <span className="hidden md:block text-orange-500">🔥</span>
          </p>
          <button className="hidden md:block w-full mt-1 text-center bg-white text-blue-600 text-sm font-semibold rounded-lg py-1 border border-blue-400">
            Upgrade now 🔥
          </button>
          <button className='md:hidden  w-full mt-1 text-center bg-white text-blue-600 text-md font-semibold rounded-lg p-3 border border-blue-400'>U</button>

        </div>

        <div className="flex items-center justify-between px-2 py-2 bg-gray-100 rounded-full">
          <button className="bg-black text-white p-2 rounded-full">
            <MdOutlineLightMode />
          </button>
          <button className="text-black p-2 rounded-full">
            <MdOutlineDarkMode />
          </button>
        </div>
      </div>
    </aside>
  );
}
