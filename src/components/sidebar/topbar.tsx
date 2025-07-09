'use client'
import { RootState } from '@/store/persist_store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function TopBar() {
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user, router]);
    return (
        <header className="flex items-center justify-between w-full px-4 py-2 md:px-6 bg-white">
            <h2 className="text-xl md:text-2xl font-semibold text-black">
                Dashboard
            </h2>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden">
                    <Image
                        src="/images/account.png"
                        alt="Doctor"
                        width={44}
                        height={44}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className='hidden md:block'>
                    <div className="flex items-center gap-1 text-sm md:text-base font-medium text-black">
                        Dr.{user?.fullname}
                        <FaCheckCircle className="text-blue-500 w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-400">Doctor</p>
                </div>
            </div>
        </header>
    );
}
