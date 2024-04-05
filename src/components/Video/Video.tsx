import classNames from 'classnames';
import { RefObject } from 'react';

interface Props {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  isMirrorEnabled?: boolean;
}

export const Video = ({
  isAudioEnabled,
  isVideoEnabled,
  isMirrorEnabled = true,
  videoRef,
}: Props) => {
  return (
    <video
      ref={videoRef}
      hidden={!isVideoEnabled}
      className={classNames('w-full h-full', {
        'scale-x-[-1]': isMirrorEnabled,
      })}
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
