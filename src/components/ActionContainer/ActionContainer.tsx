'use client';

import { useChat } from '@/context/Context';
import {
  ArrowLeftEndOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  MicrophoneIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

import { ActionButton, Props as ActionButtonProps } from '../ActionButton';

export const ActionContainer = () => {
  const router = useRouter();
  const { roomConf, setRoomConf, resetAll } = useChat();

  const { isAudioEnabled, isChatVisible, isVideoEnabled } = roomConf;

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
    {
      enabledColor: 'bg-[#8AB4F8]',
      children: (
        <>
          <ChatBubbleLeftRightIcon className='h-6 w-6 stroke-white' />
          <div className='absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#EA4335] border-2 border-white rounded-full -top-1 -end-1' />
        </>
      ),
      off: !isChatVisible,
      disabledColor: 'bg-[#3C4043]',
      onClick: function (): void {
        setRoomConf((prev) => ({
          ...prev,
          isChatVisible: !prev.isChatVisible,
        }));
      },
    },
    {
      enabledColor: 'bg-[#EA4335]',
      children: (
        <ArrowLeftEndOnRectangleIcon className='h-6 w-6 stroke-white' />
      ),
      disabledColor: 'bg-[#3C4043]',
      onClick: function (): void {
        resetAll();
        router.push('/');
      },
    },
  ];

  return (
    <div className='flex items-center justify-center gap-3 p-4'>
      {buttons.map((button, idx) => (
        <ActionButton key={idx} {...button} />
      ))}
    </div>
  );
};
