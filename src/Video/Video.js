// import "./Video.css"
import { AgoraVideoPlayer } from "agora-rtc-react";
import { CircularProgress, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
require("dotenv").config();

export default function Video(props) {
  const { users, tracks,showChat } = props;
  const [mainVideo, setMainVideo] = useState(null);
  const [subVideo, setSubVideo] = useState(null);
  const [isDoctorJoined, setIsDoctorJoined] = useState(false);

  useEffect(() => {
    if (tracks && tracks[1]) {
      setMainVideo(tracks[1]);
    }
  }, [tracks]);

  useEffect(() => {
    if (users.length > 0 && users[0].videoTrack) {
      setSubVideo(users[0].videoTrack);
      setIsDoctorJoined(true);
    }
  }, [users]);

  return (
    <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    {!isDoctorJoined ? (
      <div
      style={{
        backgroundColor: "white",
        height: "500px",
        width: "1400px",
        marginTop: "-70px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        
          <div style={{ width: "90%", display: "flex" }}>
            <div
              style={{
                height: "400px",
                width: "830px",
                borderRadius: "20px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              
              }}
            >
              {mainVideo && (
                <AgoraVideoPlayer
                  videoTrack={mainVideo}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "20px",
                    
                  }}
                />
              )}
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" style={{ marginBottom: 20 }}>
                  Please Wait for the Doctor to attend the call
                </Typography>
                <CircularProgress size={60} />
              </div>
            </div>
          </div>
       
      </div>
    ) : (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute", // Ensures it's on top of other elements
          top: 0,
          left: 0,
        }}
      >
        {mainVideo && (
          <AgoraVideoPlayer
          videoTrack={mainVideo}
          style={{
            height: showChat ? "calc(100% - 25%)" : "100%",
            width: showChat ? "calc(100-10%)" : "100%",
            borderRadius: showChat ? "20px" : "0px", // Adjusted border radius            // margin: showChat ? "5%": "none" ,
           
            backgroundColor: "black",
            transition: "height 0.3s ease, width 0.3s ease",
            display:"flex",
           
            }}
          />
        )}
        {subVideo && (
          <div
            style={{
              position: "absolute",
                bottom:showChat ? "15%": "15%",
                right: showChat ? "28%" : "5%",
                width: showChat ? "20%" : "20%",
                height: showChat ? "20%" : "20%",
                cursor: "pointer",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "width 0.3s ease, height 0.3s ease",
            }}
            onClick={() => {
              const temp = mainVideo;
              setMainVideo(subVideo);
              setSubVideo(temp);
            }}
          >
            <AgoraVideoPlayer
              videoTrack={subVideo}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                backgroundColor: "black",
              }}
            />
          </div>
        )}
      </div>
    )}
  </div>
  
  );
}
