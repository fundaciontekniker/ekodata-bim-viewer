"use strict";

const connectToHub = (url) => {
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(url, {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
            withCredentials: false
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    hubConnection.start()
        .then(() => console.log(`Connection established with the Hub ${url}`))
        .catch(err => console.error(err));

    return hubConnection;
};

export const connectToViewerHub = (url, onModelReceived = null) => {
    const hubConnection = connectToHub(`${url}/viewer`);
    if (onModelReceived) {
        hubConnection.on("ReceiveConvertedFileAsync", onModelReceived);
    }
    return hubConnection;
};