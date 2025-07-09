'use client';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/persist_store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user.user?._id);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace('/'); 
    }
  }, [user, router]);

  return <>{children}</>;
}