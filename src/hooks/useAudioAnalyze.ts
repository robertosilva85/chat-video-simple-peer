'use client';

import { useRef, useState } from 'react';

interface Props {
  checkAudio: (stream: MediaStream) => void;
  destroy: () => void;
  isSpeaking: boolean;
}

export const useAudioAnalyze = (): Props => {
  const requestRef = useRef<number>(0);
  const [audioData, setAudioData] = useState({
    audioData: new Uint8Array(0),
    isSpeaking: false,
  });

  const checkAudio = (stream: MediaStream) => {
    const audioContext = new window.AudioContext();
    const audioAnalyser = audioContext.createAnalyser();

    const audioSource = audioContext.createMediaStreamSource(stream);

    audioSource.connect(audioAnalyser);
    audioAnalyser.fftSize = 2048;
    let dataArray = new Uint8Array(audioAnalyser.frequencyBinCount);

    const threshold = 0.02;
    let isSpeaking = false;

    const tick = () => {
      audioAnalyser.getByteTimeDomainData(dataArray);

      // Calculate the Root Mean Square (RMS) to determine the volume.
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        let x = (dataArray[i] - 128) / 128; // Normalize the values
        sum += x * x;
      }

      let rms = Math.sqrt(sum / dataArray.length);

      // Check if the RMS value exceeds the threshold
      let currentlySpeaking = rms > threshold;
      if (currentlySpeaking !== isSpeaking) {
        isSpeaking = currentlySpeaking;
        // Update the state to indicate whether the person is speaking
        setAudioData({ ...audioData, isSpeaking });
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
  };

  const destroy = () => {
    cancelAnimationFrame(requestRef.current);
  };

  return { checkAudio, destroy, isSpeaking: audioData.isSpeaking };
};
