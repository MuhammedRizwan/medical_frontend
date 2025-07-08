'use client';

import IUser from '@/interface/user';
import { signup } from '@/service/user_service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCog } from 'react-icons/fa';

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoding] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      setIsLoding(true)
      const response = await signup(data)
      if (response.success) {
        toast.success('password is send to your email')
        toast.success(response.message)
        router.push('/')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoding(false)
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center text-black">
      <div className="text-left w-full max-w-md px-10 mb-20">
        <h1 className="text-blue-600 text-3xl font-semibold leading-tight">
          life support <br />
          <div className="flex text-3xl font-semibold tracking-wide">
            learning
            <div>
              <p className="text-xs text-normal">powered by</p>
              <p className="text-xs text-normal">Duty Doctor</p>
            </div>
          </div>
        </h1>
      </div>

      <div className="w-full flex flex-col justify-center items-center px-3">
        <h2 className="text-3xl font-bold mb-1 text-black">Register Your Account</h2>
        <div className='flex w-1/3 justify-center items-center mx-auto text-center'>
          <p className="mb-6 text-black ">Enter your credentials to register your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              {...register('fullname', { required: 'Full name is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
            {errors.fullname && (
              <p className="text-xs text-red-500 mt-1">{errors.fullname.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format'
                }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            <FaCog className="absolute top-9 right-3 text-gray-500" />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              {...register('mobile', {
                required: 'Mobile number is required',
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: 'Enter a valid 10-digit mobile number'
                }
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+91 98765 43210"
            />
            {errors.mobile && (
              <p className="text-xs text-red-500 mt-1">{errors.mobile.message}</p>
            )}
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg ${isLoading ? "bg-gray-400 cursor-not-allowed" : " bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {isLoading ? (
              <div className='flex justify-center items-center'>
                <div className="w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Register Now"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-10">
          Powered by Duty Doctor <br />
          © 2025 life support learning. All rights reserved.
        </p>
      </div>
    </div>
  );
}
