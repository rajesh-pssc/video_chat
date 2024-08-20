import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./Video/VideoCall";
import Chat from "./chat/Chat";
import "./AppVideoChat.css";

function App() {
  const [inCall, setInCall] = useState(false);
  const [showChat, setShowChat] = useState(false); // Initially hide chat

  // return (
  //   <div className="App" style={{ display: "flex" }}>
  //     {inCall && (
  //       <div
  //         className={`app-container ${showChat ? "show-chat" : ""}`}
  //         style={{ display: "flex", flex: 1 }}
  //       >
  //         <div className="video-container">
  //           <VideoCall setInCall={setInCall} setShowChat={setShowChat} />
  //         </div>
  //         {showChat && (
  //           <div className="chat-container">
  //             <Chat />
  //           </div>
  //         )}
  //       </div>
  //     )}
  //     {!inCall && (
  //       <div
  //         style={{
  //           flex: 1,
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={() => setInCall(true)}
  //         >
  //           Join Call
  //         </Button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="App" style={{ display: "flex" }}>
      {inCall && (
        <div className={`app-container ${showChat ? "show-chat" : ""}`} style={{ display: "flex", flex: 1 }}>
          <div className="video-container">
            <VideoCall setInCall={setInCall} setShowChat={setShowChat} showChat={showChat} />
          </div>
          {showChat && (
            <div className="chat-container">
              <Chat />
            </div>
          )}
        </div>
      )}
      {!inCall && (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setInCall(true)}
          >
            Join Call
          </Button>
        </div>
      )}
    </div>
  );

}



export default App;
