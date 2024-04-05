import { PeerInstance } from '@/interfaces/general';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

export const Camera = ({ peer, callerId }: PeerInstance) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer?.on('stream', (stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <div>
      <div className='flex justify-center items-center align-middle bg-black w-[200px] h-[150px]'>
        <UserCircleIcon className='h-10 w-10 stroke-gray-500' />
        {/* <video
        ref={videoRef}
        className='w-[200px] h-[150px]'
        playsInline
        muted
        autoPlay
      /> */}
      </div>
      <div className='flex flex-row gap-1 items-center align-middle'>
        <MicrophoneIcon className='h-4 w-4 drop-shadow-sm stroke-red-600' />
        <p className='text-white drop-shadow-sm text-sm'>Roberto Vieira</p>
      </div>
    </div>
  );
};
