import { useState, useEffect } from "react";
import {
  config,
  useClient,  
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings.js";
import { Grid } from "@material-ui/core";
import Video from "./Video.js";
import Controls from "./Controls";
import { Button } from "@material-ui/core";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


export default function VideoCall(props) {
  const { setInCall,setShowChat,showChat } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

 
  useEffect(() => {
    const init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        if (users.length < 1) {
          await client.subscribe(user, mediaType);
          if (mediaType === "video") {
            setUsers((prevUsers) => [...prevUsers, user]);
          }
          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        } else {
          await client.unsubscribe(user, mediaType);
          await client.kick(user);
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio" && user.audioTrack) {
          user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) =>
            prevUsers.filter((User) => User.uid !== user.uid)
          );
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) =>
          prevUsers.filter((User) => User.uid !== user.uid)
        );
      });

      try {
        await client.join(config.appId, name, config.token, null);
        if (tracks) {
          await client.publish([tracks[0], tracks[1]]);
          setStart(true);
        }
      } catch (error) {
        console.error("Error joining or publishing", error);
      }
    };

    if (ready && tracks) {
      init(channelName);
    }
  }, [client, ready, tracks, users.length]);

 
  return(
    <div style={{ display: "flex", height: "100vh", gap: "10px",overflow: "hidden" }}>
      {/* Video section - 75% width */}
      <div  style={{
          flex: showChat ? "0 0 100%" : "1",
          backgroundColor: "#f0f0f0",
          position: "relative",
          transition: "flex 0.3s ease",
        }}>
        <Grid
          container
          direction="column"
          style={{ height: "100%" }}
        >
          <Grid item >
            {ready && tracks && (
              <Controls
                tracks={tracks}
                setStart={setStart}
                setInCall={setInCall}
                setShowChat={setShowChat}
              />
            )}
          </Grid>
          <Grid item style={{ height: "100%" ,overflow: "hidden"}}>
            {start && tracks && <Video tracks={tracks} users={users} showChat={showChat} />}
          </Grid>
        </Grid>
      </div>

    </div>
  );
}
