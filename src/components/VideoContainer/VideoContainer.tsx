'use client';

import { useChat } from '@/context/Context';
import { useAudioAnalyze } from '@/hooks/useAudioAnalyze';
import usePeer from '@/hooks/usePeer';
import { useEffect, useRef } from 'react';

import { ActionContainer } from '../ActionContainer';
import { VideoBox } from '../VideoBox';

export const VideoContainer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { name, roomConf, userAvatarColor, currentStream, setCurrentStream } =
    useChat();

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
    if (currentStream) checkAudio(currentStream);
  }, [currentStream, checkAudio]);

  return (
    <div className='flex-1 flex flex-col'>
      <VideoBox
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        isSpeaking={isSpeaking}
        bgColor={userAvatarColor}
        name={name}
        videoRef={videoRef}
      />
      <ActionContainer />
    </div>
  );
};
