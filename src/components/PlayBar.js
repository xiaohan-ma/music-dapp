import "../styles/PlayBar.css";
import { useState, useEffect, useRef } from "react";

const PlayBar = (props) => {
  const [songIndex, setSongIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);

  const audioRef = useRef(new Audio(props.tokens[songIndex].media));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const currentPercentage = audioRef.current.duration
    ? `${(songProgress / audioRef.current.duration) * 100}%`
    : "0%";
  const timebarStyle = `
-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

  /** Audio player to check whether paused or playing */
  useEffect(() => {
    if (props.playing) {
      audioRef.current.play();
      beginTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [props.playing]);
  /** Use effect to check on interval */
  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  /** Use effect to check for song index changes */
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(props.tokens[songIndex].media);
    setSongProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      props.isPlaying(true);
      beginTimer();
    }
  }, [songIndex]);

  function prevSong() {
    if (songIndex - 1 < 0) {
      setSongIndex(props.tokens.length - 1);
    } else {
      setSongIndex(songIndex - 1);
    }
  }

  function nextSong() {
    if (songIndex < props.tokens.length - 1) {
      setSongIndex(songIndex + 1);
    } else {
      setSongIndex(0);
    }
  }

  function beginTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        nextSong();
      } else {
        setSongProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }

  function onTrack(time) {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = time;
    setSongProgress(audioRef.current.currentTime);
  }

  function trackScroll() {
    if (!props.playing) {
      props.isPlaying(true);
    }
    beginTimer();
  }

  function displayTime() {
    let time = Math.round(audioRef.current.currentTime);
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return minutes + ":" + seconds;
  }
  return (
    <div className="playbar">
      <div className="playing-info-sec"></div>
      <div className="player-controls-sec">
        <div id="control-btns">
          <button id="previous" onClick={() => prevSong()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M31.1 64.03c-17.67 0-31.1 14.33-31.1 32v319.9c0 17.67 14.33 32 32 32C49.67 447.1 64 433.6 64 415.1V96.03C64 78.36 49.67 64.03 31.1 64.03zM267.5 71.41l-192 159.1C67.82 237.8 64 246.9 64 256c0 9.094 3.82 18.18 11.44 24.62l192 159.1c20.63 17.12 52.51 2.75 52.51-24.62v-319.9C319.1 68.66 288.1 54.28 267.5 71.41z" />
            </svg>
          </button>
          <button id="play" onClick={() => props.isPlaying(!props.playing)}>
            {props.playing ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
              </svg>
            )}
          </button>
          <button id="next" onClick={() => nextSong()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M287.1 447.1c17.67 0 31.1-14.33 31.1-32V96.03c0-17.67-14.33-32-32-32c-17.67 0-31.1 14.33-31.1 31.1v319.9C255.1 433.6 270.3 447.1 287.1 447.1zM52.51 440.6l192-159.1c7.625-6.436 11.43-15.53 11.43-24.62c0-9.094-3.809-18.18-11.43-24.62l-192-159.1C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6z" />
            </svg>
          </button>
        </div>
        <div id="timestamp-bar">
          <span id="time">{displayTime()}</span>
          <input
            id="timebar"
            type="range"
            min="0"
            max={
              audioRef.current.duration
                ? audioRef.current.duration
                : `${audioRef.current.duration}`
            }
            value={songProgress}
            onMouseUp={trackScroll}
            onKeyUp={trackScroll}
            onChange={(event) => onTrack(event.target.value)}
            step="1"
            style={{ background: timebarStyle }}
          ></input>
        </div>
      </div>
      <div className="volume-controls-sec">
        <button id="volume1-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z" />
          </svg>
        </button>
        <input id="volume-bar"></input>
      </div>
    </div>
  );
};

export default PlayBar;
