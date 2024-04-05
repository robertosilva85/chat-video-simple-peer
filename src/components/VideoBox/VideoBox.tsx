'use client';

import { MicrophoneIcon } from '@heroicons/react/16/solid';
import classNames from 'classnames';
import { RefObject } from 'react';

import { Video } from '../Video';

export const VideoBox = ({
  name,
  bgColor,
  videoRef,
  isVideoEnabled,
  isAudioEnabled,
  isSpeaking = false,
}: {
  name: string;
  bgColor: string;
  videoRef: RefObject<HTMLVideoElement>;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isSpeaking?: boolean;
}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-3 rounded-lg p-5 aspect-video max-h-[calc(100vh-170px)]'>
      <div className='w-full h-full flex justify-center items-center'>
        {!isVideoEnabled && (
          <>
            <span className='relative flex w-28 h-28'>
              <span
                className={classNames(
                  'absolute inline-flex h-full w-full rounded-full bg-[#3C4043] opacity-75',
                  {
                    'animate-ping': isSpeaking && isAudioEnabled,
                  }
                )}
              ></span>
              <span
                className={
                  'relative inline-flex rounded-full items-center justify-center text-white text-6xl font-light w-28 h-28'
                }
                style={{ backgroundColor: bgColor }}
              >
                {name.substring(0, 1).toUpperCase()}
              </span>
            </span>
          </>
        )}
        <Video
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          videoRef={videoRef}
        />
      </div>
      <p className='flex items-center w-full ml-[8px] mt-[-32px] text-white drop-shadow-lg'>
        {name}
        <MicrophoneIcon
          className={classNames('w-4 h-4 ml-2', {
            'text-[#EA4335]': !isAudioEnabled,
            'text-white': isAudioEnabled,
          })}
        />
      </p>
    </div>
  );
};
