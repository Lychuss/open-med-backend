import { username } from "better-auth/plugins";
import { app } from "../app";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

export const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

registerSocketHandlers(io);

io.on("connection", (socket) => {
    console.log("connected");

    socket.on("disconnect", () => {
        console.log("user has left");
    })
})

function registerSocketHandlers(io: Server) {
    io.on("connection", (socket) => {

        socket.on("room:join", async ({roomId, user, msg}, ack) => {

            socket.join(roomId);

            socket.data.roomId = roomId;
            socket.data.username = user;

            console.log(`${user}: ${msg}`);

            socket.to(roomId).emit("room:user-joined", { msg: `Welcome ${user}, this is the room ${roomId}`})

            const sockets = await io.in(roomId).fetchSockets();
            const users = sockets
                .filter((s) => s.id !== socket.id)
                .map((s) => ({ id: s.id, username: s.data.username }));
            ack?.({users});
        })

        socket.on("webrtc:offer", ({ to, offer }) => {
            if(!isInRoom(io, socket.id, to)) return;
            io.to(to).emit("webrtc:offer", { from: socket.id, offer })
        })

        socket.on("webrtc:answer", ({ to, answer }) => {
            if(!isInRoom(io, socket.id, to)) return;
            io.to(to).emit("webrtc:answer", { from: socket.id, answer})
        })

        socket.on("webrtc:ice-candidate", ({ to, candidate}) => {
            if(!isInRoom(io, socket.id, to)) return;
            io.to(to).emit("webrtc:ice-candidate", { from: socket.id, candidate})
        })
    })
}

function isInRoom(io: Server, from: string, to: string){
    const roomId = io.sockets.sockets.get(from)?.data.roomId;
    return !!roomId && io.sockets.adapter.rooms.get(roomId)?.has(to);
}