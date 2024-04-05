'use client';

import { useChat } from '@/context/Context';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

import { ChatBubble } from '../ChatBubble';

export const ChatContainer = () => {
  const { roomConf, setRoomConf } = useChat();

  const onClick = () => {
    setRoomConf((prev) => ({ ...prev, isChatVisible: !prev.isChatVisible }));
  };

  return (
    <div
      className={classNames(
        'w-[300px] bg-white ease-in-out rounded-md transition-all duration-300 transform',
        {
          'mr-[-300px]': !roomConf.isChatVisible,
          '-translate-x-0': roomConf.isChatVisible,
        }
      )}
    >
      <div className='p-6 h-[90%]'>
        <div className='flex flex-row items-center mb-6'>
          <h3>In-call messages</h3>
          <button
            className='absolute rounded-full hover:bg-[#F5f5f5] p-2 right-3'
            onClick={onClick}
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
        </div>
        <ChatBubble message='Hello Roberto' />
        <ChatBubble message='Hello Roberto' />
        <ChatBubble message='Hello Roberto' />
      </div>
      <div className=' bg-white px-6 py-12'>
        <div className='flex flex-row items-center justify-between rounded-full bg-[#F1F3F4] '>
          <input
            type='text'
            placeholder='Send a message'
            className='group h-[44px] flex-grow border-0 bg-transparent pl-5 pr-5 text-sm text-gray-700 focus-visible:outline-0 focus-visible:ring-0'
          />
          <button className='mr-3'>
            <PaperAirplaneIcon className='h-6 v-6 stroke-[#3C4043] opacity-35' />
          </button>
        </div>
      </div>
    </div>
  );
};
