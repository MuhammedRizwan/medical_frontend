'use client'
import AnalyticsCard from "@/components/dashboard/analytics_card";
import LessonCard from "@/components/dashboard/lesson_card";
import UpcomingLiveClass from "@/components/dashboard/liveclass_card";
import { RootState } from "@/store/persist_store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const router=useRouter()
   const user = useSelector((state: RootState) => state.user.user?._id); 
    if(!user){
        router.push('/')
    }
  return (
    <div className="space-y-6">
      <div>
        <UpcomingLiveClass />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        <div className="xl:col-span-2 h-full">
          <LessonCard />
        </div>
        <div className="xl:col-span-1 h-full">
          <AnalyticsCard />
        </div>
      </div>
    </div>
  );
}
