'use client';

import { useStateRef } from '@/hooks/useStateRef';
import { PeerInstance, RoomProps } from '@/interfaces/general';
import { randomColor } from '@/utils/helper';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ContextProps {
  callers: PeerInstance | null;
  setCallers: Dispatch<SetStateAction<PeerInstance | null>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  sessionId: string;
  setSessionId: Dispatch<SetStateAction<string>>;
  roomConf: RoomProps;
  setRoomConf: Dispatch<SetStateAction<RoomProps>>;
  userAvatarColor: string;
  currentStream: MediaStream | null;
  setCurrentStream: Dispatch<SetStateAction<MediaStream | null>>;
  currentScreenStream: MediaStream | null;
  setCurrentScreenStream: Dispatch<SetStateAction<MediaStream | null>>;
  resetAll: () => void;
}

const defaultProps = {
  isAudioEnabled: false,
  isVideoEnabled: false,
  isChatVisible: false,
  isSharingScreen: false,
};

export const ChatContext = createContext<ContextProps>({} as ContextProps);

export const useChat = () => {
  if (!ChatContext)
    throw new Error('useChat must be used within a ChatContext');
  return useContext(ChatContext)!;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('');
  const [callers, setCallers] = useState<PeerInstance | null>(null);
  const [sessionId, setSessionId] = useState('');
  const [roomConf, setRoomConf] = useState<RoomProps>(defaultProps);

  const [, setCurrentStream, currentStream] = useStateRef<MediaStream | null>(
    null
  );

  const [, setCurrentScreenStream, currentScreenStream] =
    useStateRef<MediaStream | null>(null);

  const userAvatarColor = useMemo(() => randomColor(), []);

  const resetAll = () => {
    setName('');
    setCallers(null);
    setSessionId('');
    setRoomConf(defaultProps);
  };

  return (
    <ChatContext.Provider
      value={{
        callers,
        currentStream: currentStream.current,
        currentScreenStream: currentScreenStream.current,
        name,
        sessionId,
        roomConf,
        userAvatarColor,
        setCallers,
        setCurrentStream,
        setCurrentScreenStream,
        setName,
        setSessionId,
        setRoomConf,
        resetAll,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
