# 🚧 Work in Progress

Please note that Chat Video Simple-Peer is currently under development. Features and documentation may change.

**Progress:** 40%

`██████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`

## 📡 Chat Video Simple-Peer: A Real-time Video Chat Application

Chat Video Simple-Peer is a powerful video conferencing tool inspired by Google Meet, built using Next.js, Socket.IO, and Simple Peer. It allows users to join a room, share their video, and communicate in real-time through a seamless interface. The application boasts a dynamic VideoContainer for the speaker, a right panel for participants, and an integrated chat container for messages.

**Demo**: [Click Here! - Remember it is in progress](https://chat-video-simple-peer.vercel.app/)

## 📷 Screenshots

### Home

![image](https://github.com/robertosilva85/chat-video-simple-peer/assets/20528537/9973e625-afdc-49df-bf4d-4aa6d880cec0)

## Meeting Room (In Progress)

![image](https://github.com/robertosilva85/chat-video-simple-peer/assets/20528537/72b6e1de-2470-4794-8c40-814fe2beedb5)

## Screen Sharing 

![image](https://github.com/robertosilva85/chat-video-simple-peer/assets/20528537/d9e3afaf-3046-4282-8e62-b06a4302f75f)


## 🚀 Features

- **Video Conferencing:** Real-time video streaming, supporting multiple participants.
- **Dynamic Video Container:** Automatically highlights the current speaker in the main container.
- **Participant Panel:** Shows participants with their camera on or off in the right panel.
- **Real-time Chat:** Integrated chat container for participants to send messages.
- **Responsive Design:** Built with Tailwind CSS for a responsive, mobile-friendly interface.

## 📦 Project Structure

The project is organized into several key directories:

- `components/`: Contains reusable UI components.
- `context/`: Context API components for global state management across components.
- `hooks/`: Custom React hooks for managing state and side effects.
- `icons/`: Houses SVG icons used throughout the application.
- `interfaces/`: Typescript interfaces for type checking.
- `utils/`: Utility functions and helpers.

## 🔌 Plugins

This application utilizes the following plugins:

- `simple-peer`: Facilitates peer-to-peer communication.
- `socket.io`: Enables real-time bidirectional event-based communication.
- `classnames`: A utility for conditionally joining classNames together.
- `tailwind`: A utility-first CSS framework for rapid UI development.

## 🛠️ Installation

To get started with NextMeet, clone the repository and install the dependencies:

```bash
git clone git@github.com:robertosilva85/chat-video-simple-peer.git
cd chat-video-simple-peer
npm install
```

## 🏃‍♂️ Running the Application

To run the NextMeet application, you need to start both the client and the server.

Start the client:

```bash
npm run dev
```

The application will now be running and accessible at http://localhost:3000.

In a separate terminal, start the server:

```bash
npm run server
```

The server will now be running and accessible at http://localhost:3001.

## 📝 Testing

Ensure that both your client and server are running. Join a room using one browser window, then open another window or use a different browser to join the same room and test the video, audio, and chat features.

## 🏗️ Under Construction

- [ ] Destroy video or/and screen sharing;
- [ ] Send message using socket.io;
- [ ] Not allow access to /chat without click in Join Now at Home Page;
- [ ] Connect Peer Signal between the connected users;
- [ ] Add code to stop sharing;
- [ ] Create a list of users with peer connection enabled;
- [ ] Improve socket connection using Next API;
- [x] Probably I have more thing to do but I am tired, it is 1:32 am.... 😴

## 🪲 Bugs

- [ ] Mobile version is not a responsive design;
- [ ] The camera is frozen on mobile version;
- [ ] The share screen button is not working on mobile;
- [ ] Chat is not appearing properly on mobile;
- [x] I will find more bugs... 🙁

## 🎓 Learning NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) as well.
