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

        socket.on("room:joined", async ({roomId, user, msg}) => {

            socket.join(roomId);

            socket.data.roomId = roomId;
            socket.data.username = user;

            console.log(`${user}: ${msg}`);

            socket.to(roomId).emit("room:user-joined", { msg: `Welcome ${user}, this is the room ${roomId}`})

            socket.on("chat:message", (text: string, username: string) => {
                
                const roomId = socket.data.roomId;
                console.log(roomId);
                if(!roomId || !text) return;

                io.to(roomId).emit("chat:message", {
                    id: crypto.randomUUID(),
                    from: socket.data.username,
                    fromId: socket.id,
                    text: text,
                    at: Date.now()
                })
            })

        })
    })
}