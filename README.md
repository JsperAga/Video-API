# Project Documentation

* https://1drv.ms/x/c/d71458a5543e6765/EWaT0vrtDL9LpE8OVtuuq54BsAx34ZRIiqXsIbUPRDhw8Q?e=jUPnZv

Criteria: 
1) open source application
2) can be customize
3) should be using JavaScript or Typescript 

List of Application:

OpenVidu - https://openvidu.io/

    Open source, self-hostable video conferencing platform.
    Fully customizable with UI components and SDKs to shape the experience.
    Uses JavaScript (and supports TypeScript) on the frontend.

Galene - https://galene.org/

    A lightweight, self-hosted WebRTC conferencing system designed for simplicity and moderate server usage.
    Written in Go (server-side) with a JavaScript client and documentation for JavaScript/TypeScript SDKs.
    MIT-licensed and highly developer-friendly.

Mediasoup - https://mediasoup.org/

    A low-level WebRTC SFU (Selective Forwarding Unit) toolkit for real-time video conferencing.
    Highly custom-friendly and ideal if you want to build your own frontend stack.
    Often paired with JavaScript/TypeScript clients.

Janus - https://janus.conf.meetecho.com/

    Open-source WebRTC gateway/SFU supporting real-time video/audio.
    Flexible and modular, suitable for building custom workflows or frontends in JavaScript/TypeScript.

Daily - https://www.daily.co/

    An open-source video call SDK (with optional commercial offerings) that supports full customization.
    JavaScript SDK available; easily integrated and programmable.

LiveKit - https://livekit.io/

    A modern, scalable open-source WebRTC-based conferencing platform with client SDKs.
    Enables building custom experience in JavaScript/TypeScript.

MiroTalk - https://p2p.mirotalk.com/newcall

    A WebRTC-powered, browser-based video calling system.
    Comes in multiple variants (C2C, P2P, SFU) written using Node.js, suitable for customization.

Note:
I haven't check customization part of each application. I will update as soon as i can.

# API
## LiveKit
* https://localhost:5000/api/v1/connectAppointment

## Daily
* https://localhost:5000/api/v1/generateLivekitToken

# Issues

## Daily
* I Need to register a credit card before I can access the Daily API

## LiveKit
* I built a LiveKit app with Node.js and managed to connect multiple users. I can show my webcam, but when I add a second user, it only shows separate videos instead of a shared video conference view. I can’t figure out why video conferencing isn’t working
