import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "5a677d60bfe0411d949b3d7bcf6cc354";
const token =
  "007eJxTYHDPqZorszZozxantgS7tP/x0pEfA2fsn5c4y6D8+sWMxy8VGEwTzczNU8wMktJSDUwMDVMsTSyTjFPMk5LTzJKTjU1NVsYfTmsIZGRIu1PAzMgAgSA+F0NeanlyRmJeXmoOAwMAccEjmA==";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token
 };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "newchannel";