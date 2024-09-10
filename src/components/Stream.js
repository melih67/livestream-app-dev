import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const Stream = () => {
  const socket = useRef(null);
  const videoRef = useRef(null);
  const mediaSource = useRef(null);
  const sourceBuffer = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:4000");

    const initMediaSource = () => {
      mediaSource.current = new MediaSource();
      mediaSource.current.addEventListener("sourceopen", handleSourceOpen);
      videoRef.current.src = URL.createObjectURL(mediaSource.current);
    };

    const handleSourceOpen = () => {
      sourceBuffer.current = mediaSource.current.addSourceBuffer(
        'video/webm; codecs="vp8, opus"'
      );
      sourceBuffer.current.mode = "sequence";
      sourceBuffer.current.addEventListener("updateend", handleUpdateEnd);
    };

    const handleUpdateEnd = () => {
      console.log("Buffer update ended");
      if (
        videoRef.current.paused &&
        mediaSource.current.readyState === "open"
      ) {
        videoRef.current.play();
      }
    };

    const handleStreamData = (data) => {
      const chunk = new Uint8Array(data);
      if (
        !sourceBuffer.current.updating &&
        mediaSource.current.readyState === "open"
      ) {
        sourceBuffer.current.appendBuffer(chunk);
      }
    };

    if (videoRef.current) {
      initMediaSource();
    }

    socket.current.on("video-stream", handleStreamData);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
      if (mediaSource.current) {
        mediaSource.current.removeEventListener("sourceopen", handleSourceOpen);
      }
      if (sourceBuffer.current) {
        sourceBuffer.current.removeEventListener("updateend", handleUpdateEnd);
      }
    };
  }, []);

  return (
    <div>
      <h2>Live Stream</h2>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default Stream;
