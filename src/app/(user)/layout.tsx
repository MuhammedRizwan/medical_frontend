import Sidebar from '@/components/sidebar/sidebar';
import Topbar from '@/components/sidebar/topbar';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
            <div className="min-h-screen flex bg-white">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <div className="ml-20 md:ml-64 p-6">
                        <Topbar />
                        {children}</div>
                </div>
            </div>
    );
}
