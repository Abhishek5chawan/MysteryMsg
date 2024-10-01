import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log('Already connected to database');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        //console.log(db)
        //console.log(db.connections)
        connection.isConnected = db.connections[0].readyState

        console.log('Connected to database successfully');
        
    } catch (error) {
        console.log("database connection failed: ", error);
        process.exit(1);
    }
}

export default dbConnect