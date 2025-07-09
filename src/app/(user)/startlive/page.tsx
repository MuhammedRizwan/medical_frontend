'use client';

import { useEffect, useState } from 'react';
import LiveCard from '@/components/live/live_card';
import LiveModal from '@/components/live/live_modal';
import ILive from '@/interface/live';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/persist_store';
import { getAll } from '@/service/live_service';
import { useRouter } from 'next/navigation';



export default function LiveGrid() {
    const router=useRouter()
    const [sessions, setSessions] = useState<ILive[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<ILive | null>(null);
     const user = useSelector((state: RootState) => state.user.user); 
    useEffect(() => {
        const fetchSessions = async () => {
            if (!user?._id) return;
            try {
                const data = await getAll(user._id);
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, [user]);

    const handleEdit = (data: ILive) => {
        setEditData(data);
        setModalOpen(true);
    };

    const handleDelete = (liveName: string) => {
        setSessions((prev) => prev.filter((s) => s.liveName !== liveName));
    };

    const handleSubmit = (updated: ILive) => {
        if (editData) {
            setSessions((prev) =>
                prev.map((s) => (s.liveName === editData.liveName ? updated : s))
            );
        } else {
            setSessions((prev) => [...prev, updated]);
        }
        setEditData(null);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessions.map((s, i) => (
                    <LiveCard
                        key={i}
                        {...s}
                        onEdit={() => handleEdit(s)}
                    />
                ))}

                <div
                    onClick={() => {
                        setEditData(null);
                        setModalOpen(true);
                    }}
                    className="rounded-2xl bg-gray-100 flex items-center justify-center text-blue-500 text-sm font-medium hover:bg-blue-50 cursor-pointer transition min-h-40"
                >
                    Create New Live +
                </div>
            </div>

            <LiveModal
                isOpen={modalOpen}
                defaultData={editData}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
            />
        </>
    );
}
