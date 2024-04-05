import { RefObject } from 'react';

import { Video } from '../Video';

interface Props {
  name: string;
  videoRef: RefObject<HTMLVideoElement>;
  onStop: () => void;
}

export const SharingBox = ({ name, videoRef, onStop }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center mt-3 rounded-lg p-5 aspect-video max-h-[calc(100vh-170px)]'>
      <div className='relative w-full h-full flex justify-center items-center'>
        <div className='absolute top-0 p-4 bg-gray-700 w-full flex justify-between items-center rounded-md'>
          <p className='text-white text-sm'>{name} is screen sharing</p>{' '}
          <button
            type='button'
            className='bg-blue-500 text-white hover:bg-blue-600 rounded-sm py-1 px-10 text-sm z-30'
            onClick={onStop}
          >
            Stop Sharing
          </button>
        </div>
        <div className='pt-16'>
          <Video
            isAudioEnabled
            isVideoEnabled
            videoRef={videoRef}
            isMirrorEnabled={false}
          />
        </div>
      </div>
    </div>
  );
};
