'use client';

import ILive from '@/interface/live';
import { createLive, deleteLive, editLive } from '@/service/live_service';
import { RootState } from '@/store/persist_store';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

interface LiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ILive) => void;
    onDelete?: (title: string) => void;
    defaultData: ILive | null;
}

interface LiveFormInputs {
    liveName: string;
    instructor: string;
    liveStart: string;
    liveEnd: string;
    image: string;
    userId: string;
}

export default function LiveModal({
    isOpen,
    onClose,
    onSubmit,
    onDelete,
    defaultData,
}: LiveModalProps) {
    const user = useSelector((state: RootState) => state.user.user);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<LiveFormInputs>({
        defaultValues: {
            liveName: '',
            instructor: '',
            liveStart: '',
            liveEnd: '',
            image: '',
            userId: '',
        },
    });

    useEffect(() => {
        if (defaultData) {
            reset({
                ...defaultData,
                liveStart: new Date(defaultData.liveStart).toISOString().slice(0, 16),
                liveEnd: new Date(defaultData.liveEnd).toISOString().slice(0, 16),
            });
        } else {
            reset({
                liveName: '',
                instructor: '',
                liveStart: '',
                liveEnd: '',
                image: '',
                userId: '',
            });
        }
    }, [defaultData, isOpen, reset]);

    if (!isOpen) return null;

    const onFormSubmit = async (data: LiveFormInputs) => {

        const formatted: ILive = {
            ...data,
            liveStart: new Date(data.liveStart),
            liveEnd: new Date(data.liveEnd),
        };

        try {
            if (defaultData?._id) {
                await editLive(formatted, defaultData._id);
            } else {
                await createLive(formatted, user?._id);
            }
            onSubmit(formatted);
            onClose();
        } catch (error) {
            console.error("Live session API error", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black" onClick={onClose}>
            <div className="absolute inset-0 opacity-80 bg-black"></div>

            <div className="relative bg-white rounded-3xl p-6 w-full max-w-xl space-y-4 z-10" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-center text-lg font-semibold text-blue-600">
                    {defaultData ? 'Edit Live' : 'Create New Live'}
                </h2>

                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-bold">Live Name</label>
                            <input
                                {...register('liveName', { required: 'Live Name is required' })}
                                placeholder="Live Name"
                                className="w-full border border-gray-400 rounded-lg p-2 mt-1"
                            />
                            {errors.liveName && <p className="text-red-500 text-xs mt-1">{errors.liveName.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-bold">Instructor</label>
                            <input
                                {...register('instructor', { required: 'Instructor is required' })}
                                placeholder="Instructor"
                                className="w-full border border-gray-400 rounded-lg p-2 mt-1"
                            />
                            {errors.instructor && <p className="text-red-500 text-xs mt-1">{errors.instructor.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-bold">Start Time</label>
                            <input
                                type="datetime-local"
                                {...register('liveStart', { required: 'Start time is required' })}
                                className="w-full border border-gray-400 rounded-lg p-2 mt-1"
                            />
                            {errors.liveStart && <p className="text-red-500 text-xs mt-1">{errors.liveStart.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-bold">End Time</label>
                            <input
                                type="datetime-local"
                                {...register('liveEnd')}
                                className="w-full border border-gray-400 rounded-lg p-2 mt-1"
                            />
                            {errors.liveEnd && <p className="text-red-500 text-xs mt-1">{errors.liveEnd.message}</p>}
                        </div>
                    </div>

                    <div
                        className="w-full h-48 border-none rounded-lg bg-gray-200 flex flex-col items-center justify-center relative cursor-pointer overflow-hidden"
                        onClick={() => document.getElementById('liveImageUpload')?.click()}
                    >
                        {(watch('image') || defaultData?.image) ? (
                            <img
                                src={watch('image') || defaultData?.image || ''}
                                alt="Live preview"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/fallback.jpg';
                                }}
                            />
                        ) : (
                            <span className="text-gray-400 text-sm font-bold">Upload Image</span>
                        )}

                        <input
                            type="file"
                            id="liveImageUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                try {
                                    const { secure_url } = await uploadToCloudinary(file);

                                    // Store the Cloudinary URL in the form
                                    setValue('image', secure_url, { shouldValidate: true });
                                } catch (err) {
                                    console.error('Cloudinary upload failed:', err);
                                    alert('Image upload failed. Please try again.');
                                }
                            }}
                        />

                    </div>


                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4">
                        {defaultData ? (
                            <>
                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            await deleteLive(defaultData._id!);
                                            if (onDelete) onDelete(defaultData.liveName);
                                            onClose();
                                        } catch (error) {
                                            console.error('Delete failed', error);
                                        }
                                    }}
                                    className="text-red-500 text-sm hover:underline font-bold"
                                >
                                    Delete
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                    Update
                                </button>
                            </>
                        ) : (
                            <div className='w-full flex justify-center items-center'>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                    Start the Live
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div >
        </div >
    );
}
