import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import cookie from "react-cookies"
import toast from 'react-hot-toast';
import ToastOrderNotification from "../components/ToastOrderNotification";



const WebSocketContext = createContext(null)

export const WebSocketProvider = ({ children, currentUser }) => {
    const [connectedClient, setConnectedClient] = useState(null);
    const clientRef = useRef(null);

    useEffect(() => {


        if (!currentUser) return;
        const token = cookie.load("jwtToken");
        const socket = new SockJS(`http://localhost:8080/webapp_war_exploded/ws?token=Bearer ${token}`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                console.log("Kết nối WebSocket");
                // client.subscribe(`/topic/notifications`, (message) => {
                //     const payload = JSON.parse(message.body)
                //     console.log("Thông báo:", payload)
                // });
                client.subscribe("/user/" + currentUser.username + "/queue/messages", (message) => {
                    console.log("Callback nhận tin nhắn được gọi!")
                    try {
                        const payload = JSON.parse(message.body)
                        console.log("Tin nhắn riêng nhận được:", payload)

                        toast.custom(<ToastOrderNotification payload={payload} />, {
                            duration: 120000,
                        });
                    } catch (e) {
                        console.error("Lỗi khi xử lý tin nhắn nhận được:", e, message.body)
                    }
                });

                setConnectedClient(client)
            },
        })



        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [currentUser]);

    return (
        <WebSocketContext.Provider value={{ stompClient: connectedClient }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);