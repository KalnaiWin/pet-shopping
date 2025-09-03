// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = () => {
  if (!socket) {
    socket = io({
      path: "/api/socket/io",
    });
  }
  return socket;
};
