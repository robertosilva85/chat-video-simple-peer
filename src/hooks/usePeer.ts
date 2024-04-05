import { PeerInstance } from '@/interfaces/general';
import { useRef } from 'react';
import Peer from 'simple-peer';

const constraints = {
  video: { width: { min: 1280 }, height: { min: 720 } },
  audio: true,
};

interface PeerSignal {
  callerId: string;
  signal: Peer.SignalData;
}

interface Props {
  startMedia: () => Promise<MediaStream>;
  stopMedia: () => void;
  startInstancePeer: (socket: any) => void;
  stream: MediaStream | undefined;
  peers: PeerInstance[];
}

const usePeer = (): Props => {
  const streamRef = useRef<MediaStream>();
  const peerInstances = useRef<PeerInstance[]>([]);

  /**
   * start media device
   */
  const startMedia = async (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia(constraints);
  };

  /**
   * add new peer connection
   * @param socket
   * @param callerId
   * @param incomingSignal
   * @returns Returning a peer instance
   */
  const addPeer = (
    socket: any,
    callerId: string,
    incomingSignal: Peer.SignalData
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: streamRef.current,
    });

    peer.on('signal', (signal) => {
      socket.emit('send-signal', { signal, callerId });
    });

    peer.signal(incomingSignal);

    return peer;
  };

  /**
   * start a new peer instance and organize the socket callbacks to return the signals
   * @param socket
   */
  const startInstancePeer = (socket: any) => {
    const peer = new Peer({
      initiator: true,
      stream: streamRef.current,
    });

    peer.on('signal', (signal) => {
      socket.emit('send-signal', { callerId: socket.id, signal });
    });

    socket.on('receive-peers', (peers: PeerSignal[]) => {
      console.log('peers', peers);
      peers.forEach((p: PeerSignal) => {
        if (p.callerId === socket.id) return;

        const newPeer = addPeer(socket, p.callerId, p.signal);
        peerInstances.current.push({ callerId: p.callerId, peer: newPeer });
      });
    });

    peer.on('stream', (stream) => {
      console.log('stream', stream);
    });
  };

  /**
   * stop media device
   */
  const stopMedia = () => {
    const tracks = streamRef.current?.getTracks();
    tracks?.forEach((track) => track.stop());

    streamRef.current = undefined;
  };

  return {
    startMedia,
    stopMedia,
    startInstancePeer,
    stream: streamRef.current,
    peers: peerInstances.current,
  };
};

export default usePeer;
