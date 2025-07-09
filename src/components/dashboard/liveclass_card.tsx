import Image from 'next/image';

export default function UpcomingLiveClass() {
  return (
    <section className="bg-white px-4 py-2 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-center w-full">
      {/* Left Content */}
      <div className="md:w-2/3 space-y-2">
        <p className="text-sm text-blue-500 font-medium">Upcoming Live class</p>

        <h3 className="text-xl md:text-3xl font-semibold text-black leading-snug">
          Real-Time Surgical Annotations
          <br />
          Heart Surgery
        </h3>

        <p className="text-sm text-black max-w-md font-semibold">
          Join this crucial heart surgery class and take a significant step in your medical
          career. Gain invaluable insights from experts – don’t miss this opportunity.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
            Start the class
          </button>
          <button className="px-4 py-2 bg-white border border-blue-400 text-blue-600 text-sm rounded-lg hover:bg-blue-50 transition">
            Schedule the class
          </button>
        </div>
      </div>

      <div className="hidden md:block w-1/3">
        <Image
          src="/images/illustration.png"
          alt="Live Class Illustration"
          width={300}
          height={300}
          className="object-contain w-full h-auto"
        />
      </div>
    </section>
  );
}
