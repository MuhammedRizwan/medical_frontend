'use client';

import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnalyticsCard() {
    const male = 100;
    const female = 150;
    const total = male + female;

    const data = useMemo(() => ({
        labels: ['Male', 'Female'],
        datasets: [
            {
                data: [male, female],
                backgroundColor: ['#3B82F6', '#EF4444'], // blue, red
                borderWidth: 0,
                cutout: '80%', // donut thickness
            }
        ],
    }), []);

    return (
        <div className="bg-white h-full flex flex-col rounded-3xl p-6 shadow-md text-center">
            <h2 className="text-lg font-semibold text-black mb-4">Student Analytics</h2>

            <div className="relative w-52 h-52 mx-auto">
                <Doughnut data={data} options={{
                    cutout: '80%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false },
                    },
                }} />
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-500">Total Student’s</p>
                    <p className="text-xl font-bold text-black">{total} Peoples</p>
                </div>
            </div>

            <div className="mt-6 flex justify-center gap-10">
                <div className="text-sm">
                    <p className="text-blue-500 font-medium">Male</p>
                    <p className="text-black text-base font-semibold">{male}</p>
                </div>
                <div className="text-sm">
                    <p className="text-red-500 font-medium">Female</p>
                    <p className="text-black text-base font-semibold">{female}</p>
                </div>
            </div>
        </div>
    );
}
