import React, { useEffect, useRef, useState } from "react";
import {
  Room,
  RoomEvent,
  createLocalTracks,
  Track,
} from "livekit-client";

export default function Appointment() {
  const [room, setRoom] = useState(null);
  const [connected, setConnected] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const connectToRoom = async () => {
      try {
        // Parse user from sessionStorage
        const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
        console.log("User from sessionStorage:", storedUser);

        // Fetch token from backend
        const res = await fetch("/api/v1/generateLivekitToken", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: storedUser.userName || "guest",
            roomName: "test-room",
          }),
        });

        const { token } = await res.json();

        // Create room instance
        const newRoom = new Room({
          adaptiveStream: true,
          dynacast: true,
          autoSubscribe: true, // 👈 like your node snippet
        });

        // Connect
        await newRoom.connect("wss://web-consult-upcpn50w.livekit.cloud", token);
        console.log("Connected to room", newRoom);

        // Event listeners (same as node snippet)
        newRoom
          .on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
            console.log("Track subscribed from:", participant.identity);

            if (track.kind === Track.Kind.Video) {
              track.attach(videoRef.current);
            }
          })
          .on(RoomEvent.Disconnected, () => {
            console.log("Disconnected from room");
            setConnected(false);
          })
          .on(RoomEvent.LocalTrackPublished, (publication) => {
            console.log("Local track published:", publication.trackSid);
          });

        // Publish local camera + mic
        const localTracks = await createLocalTracks({ audio: true, video: true });
        localTracks.forEach((track) => {
          newRoom.localParticipant.publishTrack(track);
          if (track.kind === Track.Kind.Video && videoRef.current) {
            track.attach(videoRef.current);
          }
        });

        setRoom(newRoom);
        setConnected(true);
      } catch (err) {
        console.error("Error connecting:", err);
      }
    };

    connectToRoom();

    // Cleanup on unmount
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h2>LiveKit Appointment</h2>
      <p>{connected ? "Connected to room" : "Connecting..."}</p>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "400px", border: "1px solid black" }}
      />
    </div>
  );
}
