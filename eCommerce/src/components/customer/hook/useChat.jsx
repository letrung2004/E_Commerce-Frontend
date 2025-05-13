// src/hooks/useChat.js
import { useEffect, useState } from "react";
import { useWebSocket } from "../../../context/WebSocketContext";

const useChat = (currentUser, recipientUsername, onReceiveMessage) => {
    const { stompClient } = useWebSocket();
    const [messages, setMessages] = useState([]);

    // Gửi tin nhắn
    const sendMessage = (content) => {
        if (!stompClient || !stompClient.connected) {
            console.warn("WebSocket chưa kết nối");
            return;
        }

        const messagePayload = {
            senderUsername: currentUser?.username,
            recipientUsername,
            content,
        };

        stompClient.publish({
            destination: "/app/chat/sendPrivateMessage",
            body: JSON.stringify(messagePayload),
        });

        // Hiển thị luôn tin nhắn gửi trong UI
        setMessages((prev) => [...prev, { from: "user", text: content }]);
    };

    // Nhận tin nhắn
    useEffect(() => {
        if (!stompClient || !stompClient.connected || !currentUser) return;

        const subscription = stompClient.subscribe(
            `/user/${currentUser.username}/queue/private/messages`,
            (message) => {
                try {
                    const payload = JSON.parse(message.body);
                    if (onReceiveMessage) {
                        onReceiveMessage(payload);
                    } else {
                        // Nếu không có, lưu local messages trong hook
                        setMessages((prev) => [...prev, { from: "store", text: payload.content }]);
                    }
                } catch (e) {
                    console.error("Lỗi xử lý tin nhắn đến", e);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [stompClient, currentUser, onReceiveMessage]);

    return { messages, sendMessage };
};

export default useChat;
