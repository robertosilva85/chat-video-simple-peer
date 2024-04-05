import Peer from 'simple-peer';

export interface RoomProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isChatVisible: boolean;
  isSharingScreen: boolean;
}

export interface PeerInstance {
  callerId: string;
  peer: Peer.Instance | null;
}
