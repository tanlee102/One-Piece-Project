import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';;

const VideoComponent = ({ videoUrl,  posterUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        // Add any Plyr configuration options here
      });

      player.poster = posterUrl;

      // Clean up the Plyr instance on component unmount
      return () => {
        player.destroy();
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