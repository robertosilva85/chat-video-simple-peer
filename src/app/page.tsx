'use client';

import {
  ActionButton,
  Props as ActionButtonProps,
} from '@/components/ActionButton';
import { Footer } from '@/components/Footer';
import { Video } from '@/components/Video';
import { useChat } from '@/context/Context';
import usePeer from '@/hooks/usePeer';
import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Home() {
  const router = useRouter();

  const {
    name,
    setName,
    roomConf,
    setRoomConf,
    currentStream,
    setCurrentStream,
  } = useChat();

  const videoRef = useRef<HTMLVideoElement>(null);

  const { startMedia } = usePeer();

  const { isAudioEnabled, isVideoEnabled } = roomConf;

  useEffect(() => {
    const effect = async () => {
      const stream = await startMedia();

      setCurrentStream(stream);
    };

    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStream && videoRef.current) {
      videoRef.current.srcObject = currentStream;
    }
  }, [currentStream]);

  const handleJoinClick = () => {
    router.push('/chat');
  };

  const buttons: ActionButtonProps[] = [
    {
      enabledColor: 'bg-[#3C4043]',
      children: <MicrophoneIcon className='h-6 w-6 stroke-white' />,
      off: !isAudioEnabled,
      disabledColor: 'bg-[#EA4335]',
      onClick: function (): void {
        setRoomConf((prev) => ({
          ...prev,
          isAudioEnabled: !prev.isAudioEnabled,
        }));
      },
    },
    {
      enabledColor: 'bg-[#3C4043]',
      children: <VideoCameraIcon className='h-6 w-6 stroke-white' />,
      off: !isVideoEnabled,
      disabledColor: 'bg-[#EA4335]',
      onClick: function (): void {
        setRoomConf((prev) => ({
          ...prev,
          isVideoEnabled: !prev.isVideoEnabled,
        }));
      },
    },
  ];

  return (
    <main>
      <div className='p-10 flex h-screen w-sc flex-row items-center justify-center gap-10'>
        <div className='bg-black w-[740px] h-[420px] rounded-md flex items-center justify-center relative'>
          {!isVideoEnabled && <p className='text-2xl'>Camera is off</p>}
          <Video
            isAudioEnabled={isAudioEnabled}
            isVideoEnabled={isVideoEnabled}
            videoRef={videoRef}
          />
          {!!name && isVideoEnabled && (
            <p className='absolute top-3 left-3 shadow-sm'>{name}</p>
          )}
          <div className='absolute bottom-7'>
            <div className='flex items-center justify-center gap-5'>
              {buttons.map((button, idx) => (
                <ActionButton key={idx} {...button} />
              ))}
            </div>
          </div>
        </div>
        <div className='text-black flex flex-col justify-center items-center w-[300px]'>
          <h3 className='mb-4 text-center text-2xl'>What&apos;s your name?</h3>
          <input
            type='text'
            className='bg-gray-200 p-3 mb-4'
            placeholder='Your name'
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            disabled={!name}
            type='button'
            className='rounded-full bg-blue-600 text-white hover:bg-blue-700 py-3 px-5 w-fit disabled:bg-gray-400'
            onClick={handleJoinClick}
          >
            Join now
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
