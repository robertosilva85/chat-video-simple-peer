import { RefObject } from 'react';

interface Props {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  videoRef: RefObject<HTMLVideoElement>;
}

export const Video = ({ isAudioEnabled, isVideoEnabled, videoRef }: Props) => {
  return (
    <video
      ref={videoRef}
      hidden={!isVideoEnabled}
      className='w-full h-full scale-x-[-1]'
      muted={!isAudioEnabled}
      autoPlay
      playsInline
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
    />
  );
};
