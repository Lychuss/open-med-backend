import { server } from "./config/socket.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const PORT = process.env.PORT || "5000";

server.listen(PORT, () => {
    console.log("Server is listening to ", PORT)
});