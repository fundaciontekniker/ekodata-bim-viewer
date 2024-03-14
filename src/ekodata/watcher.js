
import * as signalR from "@microsoft/signalr";

const Watcher = (function() {
    function connectToHub(hubUrl) {
        console.log(`Connecting with the Hub ${hubUrl}`);
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                withCredentials: false
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();
        hubConnection.start()
            .then(() => console.log(`Connection established with the Hub ${hubUrl}`))
            .catch(err => console.error(err));
        return hubConnection;
    }
    function connectToViewer(hubUrl, onModelReceived = null) {
        const hubConnection = connectToHub(`${hubUrl}/viewer`);
        if (onModelReceived) {
            hubConnection.on("ReceiveConvertedFileAsync", onModelReceived);
        }
        return hubConnection;
    }
    return {
        connectToViewer
    };
})();

export { Watcher };