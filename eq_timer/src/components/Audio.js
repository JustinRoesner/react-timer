import React, { useState, useEffect } from "react";
import soundFile from '../assets/ff.mp3';

const useAudio = url => {
  const [audio] = useState(new Audio(soundFile));
  //const [audio] = useState(new Audio("http://soundfxcenter.com/video-games/final-fantasy-xi/8d82b5_Final_Fantasy_XI_Caught_Fish_Sound_Effect.mp3"));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      audio.volume = 0.15;
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Player = ({ url }) => {
  const [playing, toggle] = useAudio(url);
  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;