import React, { useState, useRef, useEffect } from 'react';
import { BsFillPauseCircleFill, BsFillPlayCircleFill } from 'react-icons/bs';

const AudioPlayer = (props) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const progress = (currentTime / duration) * 100;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleLoadedMetadata = () => {
      const duration = audioElement.duration;
      if (duration == Infinity) {
        audioElement.currentTime = 1e101;
        audioElement.addEventListener('timeupdate', getDuration);
      }
    };

    const getDuration = (event) => {
      event.target.currentTime = 0;
      event.target.removeEventListener('timeupdate', getDuration);
      setDuration(event.target.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // setCurrentTime(0);
    };

    audioElement.load();
    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  return (
    <div className="fixed bottom-4 w-[calc(100%-40px)]">
      <div className="flex items-center w-full gap-x-4">
        <audio ref={audioRef} src={props.publicUrl} />
        {isPlaying ? (
          <BsFillPauseCircleFill size={42} role="button" onClick={togglePlayPause} />
        ) : (
          <BsFillPlayCircleFill size={42} role="button" onClick={togglePlayPause} />
        )}
        <div className="bg-black w-full h-4 rounded-xl flex items-center p-1">
          <div
            className="bg-white w-[20%] h-full rounded-xl"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
      <div>
        <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
