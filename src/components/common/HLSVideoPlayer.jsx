"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import PlayIcon from "../../assets/icons/playIcon.svg";
import { normalizeVideoUrl } from "../../helpers/config";

const HLSVideoPlayer = ({
  src,
  poster,
  autoPlay = true,
  controls = true,
  className = "",
  onLoadStart,
  onWaiting,
  onPlaying,
  onCanPlay,
}) => {
  const normalizedSrc = normalizeVideoUrl(src);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay(e);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !normalizedSrc) return;

    // Reset states on src change
    setIsLoading(true);
    setIsBuffering(false);
    setProgress(0);
    setCurrentTime(0);

    const isHLS = normalizedSrc.split("?")[0].split("#")[0].toLowerCase().endsWith(".m3u8");

    if (isHLS && Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        xhrSetup: (xhr) => {
          xhr.withCredentials = false;
        },
      });

      hlsRef.current = hls;
      hls.loadSource(normalizedSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        if (autoPlay) {
          video.play().catch((err) => {
            console.warn("Autoplay blocked:", err);
            setIsPlaying(false);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setIsLoading(false);
          setIsBuffering(false);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else {
      // Native HLS (Safari) or standard video (MP4)
      video.src = normalizedSrc;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [normalizedSrc, autoPlay]);

  // Handle controls visibility
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetControlsTimeout();
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    resetControlsTimeout();
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    const newParams = parseFloat(e.target.value);
    video.currentTime = (video.duration / 100) * newParams;
    setProgress(newParams);
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVolume = parseFloat(e.target.value);
    const video = videoRef.current;
    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0) {
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return result.startsWith("00:") ? result.substr(3) : result;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
    if (onWaiting) onWaiting();
  };

  const handlePlaying = () => {
    setIsLoading(false);
    setIsBuffering(false);
    setIsPlaying(true);
    if (onPlaying) onPlaying();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    if (onCanPlay) onCanPlay();
  };

  const handleError = (e) => {
    console.error("Video Error:", e);
    setIsLoading(false);
    setIsBuffering(false);
  };

  const showLoader = (isLoading || isBuffering) && !!normalizedSrc;

  return (
    <div
      className={`hls-player-container ${className}`}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={togglePlay}
    >
      {showLoader && (
        <div className="netflix-loader-overlay">
          <div className="netflix-spinner"></div>
        </div>
      )}

      <video
        ref={videoRef}
        poster={poster}
        controls={false} // Custom controls
        playsInline
        muted={isMuted}
        autoPlay={autoPlay}
        crossOrigin="anonymous"
        className={`hls-video-element ${showLoader ? "video-blur" : ""}`}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadStart={() => setIsLoading(true)}
        onError={handleError}
      />

      {/* Large Center Play Button (only when paused and not loading) */}
      {!isPlaying && !showLoader && (
        <div className="custom-play-overlay">
          <div className="center-play-button">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="white" fill="transparent">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Custom Bottom Controls */}
      <div className={`custom-video-controls ${showControls ? "visible" : "hidden"}`} onClick={(e) => e.stopPropagation()}>
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar-slider"
            style={{ "--brand-color": "#079D92", "--progress": `${progress}%` }}
          />
        </div>

        <div className="controls-main-bar">
          <div className="left-controls">
            <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="volume-control-group">
              <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM3 9v6h4l5 5V4L7 9H3z" />
                    <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="2" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
              <div className="volume-slider-container">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                  style={{ "--brand-color": "#079D92", "--progress": `${(isMuted ? 0 : volume) * 100}%` }}
                />
              </div>
            </div>

            <div className="time-display text-white text-sm font-medium max-[768px]:!text-xs" >
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="right-controls">
            <button className="control-btn" onClick={toggleFullscreen} aria-label="Toggle Fullscreen">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HLSVideoPlayer;
