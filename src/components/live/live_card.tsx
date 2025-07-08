'use client';

interface LiveCardProps {
  liveName: string;
  instructor: string;
  peopleJoined?: number;
  status?: string;
  liveStart: Date;
  liveEnd: Date;
  image: string;
  onEdit: () => void;
}

export default function LiveCard({
  liveName,
  instructor,
  peopleJoined = 0,
  status,
  liveStart,
  image,
  onEdit,
}: LiveCardProps) {
  const isUpcoming = new Date(liveStart).getTime() > Date.now();

  return (
    <div
      className="relative p-2 group rounded-2xl overflow-hidden bg-gray-100 shadow cursor-pointer"
      onClick={onEdit}
    >
      <img src={image} alt={liveName} className="w-full h-36 object-cover blur-md" />

      <div className="bg-white p-4 space-y-1 rounded-2xl">
        <h3 className="text-blue-600 font-semibold text-sm truncate">{liveName}</h3>
        <p className="text-xs text-gray-600">Instructor: {instructor}</p>

        {isUpcoming ? (
          <div className="flex justify-between text-xs text-gray-500">
            <p>Joined: {peopleJoined}</p>
            <span className="text-blue-500 font-semibold">Starts Soon</span>
          </div>
        ) : (
          <div className="flex justify-between text-xs text-gray-400">
            <span>{status}</span>
            <span>Start: {new Date(liveStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </div>
    </div>
  );
}
