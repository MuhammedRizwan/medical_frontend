'use client';

import Image from 'next/image';

interface LessonCardProps {
    icon: string;
    title: string;
    description: string;
}

const lessons: LessonCardProps[] = [
    {
        title: 'Pediatrics & Child Health',
        description:
            'Covers newborn care, childhood illnesses, growth monitoring, and pediatric emergency management.',
        icon: '/images/cartoon-1.png',
    },
    {
        title: 'Clinical Research & Medical Ethics',
        description:
            'Explore principles of clinical trials, research methodologies, and ethical considerations in medicine.',
        icon: '/images/cartoon-2.png',
    },
    {
        title: 'Emergency & Critical Care Medicine',
        description:
            'Master life-saving procedures, trauma management, and emergency protocols for cardiac arrest, stroke, and sepsis.',
        icon: '/images/cartoon-3.png',
    },
    {
        title: 'Radiology & Imaging Techniques',
        description:
            'Learn the principles of X-rays, CT scans, MRIs, and ultrasound in disease diagnosis.',
        icon: '/images/cartoon-4.png',
    },
];

export default function ActiveLessonsPage() {
    return (
        <main className="bg-white h-full flex flex-col rounded-3xl p-5 md:p-5 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-black mb-4">Active Lesson</h2>

            {lessons.map((lesson) => (
                <div
                    key={lesson.title}
                    className="flex items-start gap-4 py-4 border-b last:border-none"
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500">
                        <Image src={lesson.icon} alt={lesson.title} width={28} height={28} />
                    </div>
                    <div>
                        <h4 className="text-base font-semibold text-black">{lesson.title}</h4>
                        <p className="text-sm text-black font-bold">{lesson.description}</p>
                    </div>
                </div>
            ))}
        </main>
    );
}
