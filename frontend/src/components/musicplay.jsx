import React, { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true); // State to track music playback

  // Function to toggle music playback
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio autoPlay={true} loop={true} controls={false} src="bossa.mp3" /> {/* Replace "your-music-file.mp3" with the path to your MP3 file */}
      <button onClick={togglePlay}>{isPlaying ? "Pause Music" : "Play Music"}</button>
    </div>
  );
};

export default MusicPlayer;
