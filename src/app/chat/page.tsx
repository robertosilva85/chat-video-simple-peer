'use client';

import { ChatContainer } from '@/components/ChatContainer';
import { VideoContainer } from '@/components/VideoContainer';
import { useEffect } from 'react';
//@ts-ignore
import useSound from 'use-sound';

export default function Chat() {
  const [play, { sound }] = useSound('/assets/audios/alert-quick-chime.wav');

  useEffect(() => {
    play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound]);

  return (
    <div className='flex-grow bg-[#202124] text-black shadow-inner'>
      <div className='flex h-screen flex-row'>
        <VideoContainer />
        <ChatContainer />
      </div>
    </div>
  );
}
