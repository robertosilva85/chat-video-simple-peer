'use client';

import { useChat } from '@/context/Context';
import { useAudioAnalyze } from '@/hooks/useAudioAnalyze';
import usePeer from '@/hooks/usePeer';
import { useEffect, useRef } from 'react';

import { ActionContainer } from '../ActionContainer';
import { Video } from '../Video';
import { VideoBox } from '../VideoBox';

export const VideoContainer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoShareScreenRef = useRef<HTMLVideoElement>(null);

  const {
    name,
    roomConf,
    userAvatarColor,
    currentScreenStream,
    currentStream,
    setCurrentStream,
  } = useChat();

  const { startMedia } = usePeer();

  const { checkAudio, destroy, isSpeaking } = useAudioAnalyze();

  const { isAudioEnabled, isVideoEnabled } = roomConf;

  useEffect(() => {
    return () => destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const effect = async () => {
      const stream = await startMedia();
      setCurrentStream(stream);

      if (videoRef.current) videoRef.current.srcObject = stream;
    };

    if (videoRef.current) {
      effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current]);

  useEffect(() => {
    if (videoShareScreenRef.current && currentScreenStream) {
      videoShareScreenRef.current.srcObject = currentScreenStream;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoShareScreenRef.current, currentScreenStream]);

  useEffect(() => {
    if (currentStream) checkAudio(currentStream);
  }, [currentStream, checkAudio]);

  return (
    <div className='flex-1 flex flex-col'>
      {!!currentScreenStream && (
        <div className='flex flex-col items-center justify-center mt-3 rounded-lg p-5 aspect-video max-h-[calc(100vh-170px)]'>
          <div className='relative w-full h-full flex justify-center items-center'>
            <div className='absolute top-0 p-4 bg-gray-700 w-full flex justify-between items-center rounded-md'>
              <p className='text-white text-sm'>{name} is screen sharing</p>{' '}
              <button
                type='button'
                className='bg-blue-500 text-white hover:bg-blue-600 rounded-sm py-1 px-10 text-sm z-30'
              >
                Stop Sharing
              </button>
            </div>
            <div className='pt-16'>
              <Video
                isAudioEnabled
                isVideoEnabled
                videoRef={videoShareScreenRef}
                isMirrorEnabled={false}
              />
            </div>
          </div>
        </div>
      )}
      {!currentScreenStream && (
        <VideoBox
          isAudioEnabled={isAudioEnabled}
          isVideoEnabled={isVideoEnabled}
          isSpeaking={isSpeaking}
          bgColor={userAvatarColor}
          name={name}
          videoRef={videoRef}
        />
      )}
      <ActionContainer />
    </div>
  );
};
