'use client';

import {
  ActionButton,
  Props as ActionButtonProps,
} from '@/components/ActionButton';
import { Footer } from '@/components/Footer';
import { Video } from '@/components/Video';
import { useChat } from '@/context/Context';
import { useAudioAnalyze } from '@/hooks/useAudioAnalyze';
import usePeer from '@/hooks/usePeer';
import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
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

  const { checkAudio, destroy, isSpeaking } = useAudioAnalyze();

  const { isAudioEnabled, isVideoEnabled } = roomConf;

  useEffect(() => {
    const effect = async () => {
      const stream = await startMedia();

      setCurrentStream(stream);
    };

    effect();

    return () => destroy();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentStream && videoRef.current) {
      checkAudio(currentStream);
      videoRef.current.srcObject = currentStream;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className='p-10 flex h-screen w-sc lg:flex-row flex-col items-center justify-center gap-10'>
        <div
          className={classNames(
            'w-[740px] h-[420px] rounded-md flex items-center justify-center relative',
            {
              'bg-black': !isVideoEnabled,
            }
          )}
        >
          {!isVideoEnabled && <p className='text-2xl'>Camera is off</p>}
          <Video
            isAudioEnabled={false}
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
          {isAudioEnabled && (
            <div className='absolute bottom-5 left-4 rounded-full bg-blue-500 p-2'>
              <div className='flex space-x-1 justify-center items-center'>
                <div
                  className={classNames('h-1.5 w-1.5 bg-white rounded-full ', {
                    'animate-bounce [animation-delay:-0.3s]': isSpeaking,
                  })}
                ></div>
                <div
                  className={classNames('h-1.5 w-1.5 bg-white rounded-full ', {
                    'animate-bounce [animation-delay:-0.15s]': isSpeaking,
                  })}
                ></div>
                <div
                  className={classNames('h-1.5 w-1.5 bg-white rounded-full ', {
                    'animate-bounce': isSpeaking,
                  })}
                ></div>
              </div>
            </div>
          )}
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
