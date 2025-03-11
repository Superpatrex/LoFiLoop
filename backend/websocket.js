const WebSocket = require("ws");
const Listener = require("./models/Listener");

const setupWebSocket = (server) => {
    console.log("Initializing WebSocket server...");
    const wss = new WebSocket.Server({ server });

    // Function to broadcast listener count
    const broadcastListenerCount = async () => {
        const listenerDoc = await Listener.findOne();
        const listenerCount = listenerDoc ? listenerDoc.count : 0;
        const message = JSON.stringify({ listenerCount });

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };

    wss.on("connection", async (ws) => {
        console.log("✅ New WebSocket client connected.");

        ws.on("message", async (message) => {
            try {
                const data = JSON.parse(message);

                if (data.type === "join") {
                    let listenerDoc = await Listener.findOne();
                    if (!listenerDoc) {
                        listenerDoc = new Listener({ count: 1 });
                    } else {
                        listenerDoc.count += 1;
                    }
                    await listenerDoc.save();
                    broadcastListenerCount();
                } else if (data.type === "leave") {
                    let listenerDoc = await Listener.findOne();
                    if (listenerDoc) {
                        listenerDoc.count = Math.max(0, listenerDoc.count - 1);
                        await listenerDoc.save();
                    }
                    broadcastListenerCount();
                }
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        });

        ws.on("close", async () => {
            console.log("❌ WebSocket client disconnected.");
            let listenerDoc = await Listener.findOne();
            if (listenerDoc) {
                listenerDoc.count = Math.max(0, listenerDoc.count - 1);
                await listenerDoc.save();
            }
            broadcastListenerCount();
        });
    });

    console.log("✅ WebSocket server is running...");
};

module.exports = setupWebSocket;