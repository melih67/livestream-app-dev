import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const Streamer = () => {
  const socket = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:4000");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm; codecs="vp8, opus"',
        });

        mediaRecorder.ondataavailable = (e) => {
          socket.current.emit("video-stream", e.data);
        };

        mediaRecorder.start(1000);
      })
      .catch((error) => console.error("Error accessing media devices.", error));

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h2>Streaming...</h2>
      <video ref={videoRef} autoPlay muted />
    </div>
  );
};

export default Streamer;
