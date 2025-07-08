'use client';

import { login } from '@/service/user_service';
import { AppDispatch } from '@/store/persist_store';
import { setUser } from '@/store/user_slice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaCog } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);
    const router = useRouter()
  const dispatch=useDispatch<AppDispatch>()
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async(data) => {
    setIsLoading(true)
    try {
      const response = await login(data)
      if (response.success) {
       dispatch(setUser(response.data))
       toast.success(response.message)
       router.push('/dashboard')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center text-black">
      <div className="text-left w-full max-w-md px-10 mb-20">
        <h1 className="text-blue-600 text-3xl font-semibold leading-tight">
          life support <br />
          <div className="flex text-3xl font-semibold tracking-wide">
            learning 
            <div>
              <p className='text-xs'>powered by</p>
              <p className='text-xs'>Duty Doctor</p>
            </div>
          </div>
        </h1>
      </div>
      <div className='w-full flex flex-col justify-center items-center px-5'>
        <div className="w-full max-w-md bg-white">
          <h2 className="text-3xl font-bold mb-1 text-black text-center">Hoi, Welcome back</h2>
          <div className='flex w-1/2 justify-center items-center mx-auto text-center'>
          <p className="mb-6 text-black ">Enter your credentials to login your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div className="relative">
              <label className="block text-sm text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              <FaCog className="absolute top-9 right-3 text-gray-500" />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute top-9 right-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember Me
              </label>
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Forgot password?
              </a>
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
              "Login"
            )}
          </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-10">
            Powered by Duty Doctor <br />
            © 2025 life support learning. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
