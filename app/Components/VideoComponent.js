import React, { useEffect, useLayoutEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';

const VideoComponent = ({ videoUrl,  posterUrl }) => {
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    if (videoRef.current) {
      const Plyr = require('plyr');
      const player = new Plyr(videoRef.current, {});
      player.poster = posterUrl;

      return () => {
        if (player) {
          player.destroy();
          videoRef.current = null;
        }
      };
    }
  }, [videoUrl]);

  return (

    <div>
      {videoUrl === "" ? (
        <div className="contain-loader">
          <div className="loader"></div>
        </div>
      ) : videoUrl === "ERR" ? (
        <div className="contain-loader">
          <p>Video không tồn tại hoặc bị lỗi!</p>
        </div>
      ) : (
        <div>
            <div className='video-plyr-container'>
                <div>
                    <video src={videoUrl} ref={videoRef} controls></video>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;