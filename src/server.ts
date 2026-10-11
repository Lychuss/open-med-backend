import { server } from "./config/socket";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || "5000";

server.listen(PORT, () => {
    console.log("Server is listening to ", PORT)
});