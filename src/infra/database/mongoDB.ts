
import mongoose from "mongoose";

/*
* 0 = disconnected
* 1 = connected
* 2 = connecting
* 3 = disconnecting
*/
const mongooConnection = {
    isConnected: 0
}

export const connect = async () => {

    if( mongooConnection.isConnected === 1) {
        return;
    }

    if(mongoose.connections && mongoose.connections.length > 0) {
       mongooConnection.isConnected = mongoose.connections[0].readyState;

       if( mongooConnection.isConnected === 1) {
        return;
       }

       await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO_URL || '');
    mongooConnection.isConnected = 1;
}

export const disconnect = async() => {
    return;
    if ( process.env.NODE_ENV === 'development') return;

    if( mongooConnection.isConnected === 0) return;
    await mongoose.disconnect();
}