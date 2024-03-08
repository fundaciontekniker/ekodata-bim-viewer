const Consumer = (function() {
    function connectToHub(hostUrl) {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                withCredentials: false
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();
        hubConnection.start()
            .then(() => console.log(`Conexión establecida con el Hub ${url}`))
            .catch(err => console.error(err));

        return hubConnection;
    }
    function connectToViewer(hostUrl, onModelReceived = null) {
        const hubConnection = connectToHub(`${hostUrl}/viewer`);
        if (onModelReceived) {
            hubConnection.on("ReceiveConvertedFileAsync", onModelReceived);
        }
        return hubConnection;
    }
    return {
        connectToViewer
    };
})();

export { Consumer };