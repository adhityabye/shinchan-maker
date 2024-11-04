"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

const musicList = [
  { title: "Opening theme song", src: "/music/1.m4a" },
  { title: "Iconic", src: "/music/2.m4a" },
  { title: "Famous Ost", src: "/music/3.m4a" },
  { title: "Chaotic", src: "/music/5.m4a" },
  { title: "Tasuketekesuta", src: "/music/6.m4a" },
];

const MusicPlayer = ({ audioRef, setIsMusicPlaying }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e) => {
      console.error("Audio error:", e);
      setError("Error playing audio. Please try another track.");
      setIsPlaying(false);
      setIsMusicPlaying(false);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadedmetadata", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadedmetadata", updateProgress);
    };
  }, [audioRef, setIsMusicPlaying]);

  useEffect(() => {
    audioRef.current.src = musicList[currentTrack].src;
    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Playback failed:", e);
        setError("Playback failed. Please check the audio file.");
        setIsPlaying(false);
        setIsMusicPlaying(false);
      });
    }
    setError(null);
  }, [currentTrack, isPlaying, audioRef, setIsMusicPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.error("Playback failed:", e);
        setError("Playback failed. Please check the audio file.");
      });
    }
    setIsPlaying(!isPlaying);
    setIsMusicPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % musicList.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + musicList.length) % musicList.length);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{musicList[currentTrack].title}</h2>
        <div className="mt-2 flex items-center">
          <span className="text-sm mr-2">{formatTime(progress)}</span>
          <div className="flex-grow bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${(progress / duration) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm ml-2">{formatTime(duration)}</span>
        </div>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevious}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <SkipBack size={24} />
        </button>
        <button
          onClick={togglePlay}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <SkipForward size={24} />
        </button>
        <div className="flex items-center">
          <Volume2 size={24} className="text-gray-600 mr-2" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
      <div className="space-y-2">
        {musicList.map((track, index) => (
          <div
            key={index}
            className={`p-2 rounded cursor-pointer ${
              index === currentTrack ? "bg-blue-100" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setCurrentTrack(index);
              setIsPlaying(true);
              setIsMusicPlaying(true);
            }}
          >
            {track.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
