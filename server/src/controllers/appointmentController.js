// Daily Connection
const axios = require("axios");

//LiveKit


const mongoose = require('mongoose');
const { Patient } = require('../models/patientModel'); // Update path as needed
const HttpStatusCode = require('../utils/httpStatusCode');
const AppError = require('../utils/appError');

const { AccessToken } = require("livekit-server-sdk"); // ✅ use require instead of import

const DAILY_API_KEY = process.env.DAILY_API_KEY;


// Daily API
const connectAppointment = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.daily.co/v1/rooms",
      {
        name: "test-room",     // required field
        privacy: "public",     // or "private"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DAILY_API_KEY}`, // ✅
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Daily.co API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to create room" });
  }
};

// LiveKit token
const generateLivekitToken = async (req, res) => {
  try {
    const { userName, roomName } = req.body;

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: "API key/secret not configured" });
    }

    if (!userName || !roomName) {
      return res
        .status(400)
        .json({ error: "userName and roomName are required" });
    }

    // Create access token
    const at = new AccessToken(apiKey, apiSecret, {
      identity: userName,
      ttl: 3600,
    });

    // Grant permissions
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    // ⚡ Important: Await the promise
    const token = await at.toJwt();

    console.log("Generated LiveKit JWT:", token);

    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
};


module.exports = {
  connectAppointment,
  generateLivekitToken
};