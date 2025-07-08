import React from 'react';

interface ImageCardProps {
  src: string;
  alt?: string;
}

export default function ImageCard({ src, alt = 'Doctor Image' }: ImageCardProps) {
  return (
    <div className="flex justify-center items-center p-15 h-screen overflow-hidden">
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-fill"
        />
      </div>
    </div>
  );
}
