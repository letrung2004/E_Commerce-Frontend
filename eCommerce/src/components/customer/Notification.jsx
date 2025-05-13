import React, { useState } from "react";
import { useWebSocket } from "../../context/WebSocketContext";
// import { useWebSocket } from "../context/WebSocketContext";

const NotificationSender = ({currentUser}) => {
    const { stompClient } = useWebSocket();
    const [message, setMessage] = useState("");
    // console.log("user: ", currentUser)

    const sendMessage = () => {
        if (stompClient && stompClient.connected) {
            // stompClient.publish({
            //     destination: "/app/sendMessage", 
            //    body: JSON.stringify({ content: message }),

            stompClient.publish({
                destination: "/app/sendPrivateMessage",
                body: JSON.stringify({
                    senderUsername: currentUser?.username,
                    recipientUsername: "dt123", 
                    content: message
                })

            });
            setMessage("");
        } else {
            console.error("WebSocket chưa kết nối.");
        }
    };



    return (
        <div className="p-4 border rounded shadow">
            <input
                className="border p-2 mr-2"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập thông báo"
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={sendMessage}
            >
                Gửi
            </button>
        </div>
    );
};

export default NotificationSender;
