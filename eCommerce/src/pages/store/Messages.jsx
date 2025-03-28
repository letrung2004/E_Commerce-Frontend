import React, { useState } from "react";
import { FaPaperPlane, FaUserCircle, FaSearch } from "react-icons/fa";

const Messages = () => {
    const [conversations, setConversations] = useState([
        {
            id: 1, name: "Khách hàng A", startTime: "10:00 AM", messages: [
                { sender: "Khách hàng A", content: "Chào bạn, tôi cần hỗ trợ!", time: "10:05 AM" },
                { sender: "Bạn", content: "Xin chào, tôi có thể giúp gì cho bạn?", time: "10:06 AM" }
            ]
        },
        {
            id: 2, name: "Khách hàng B", startTime: "11:15 AM", messages: [
                { sender: "Khách hàng B", content: "Tôi muốn biết thêm về sản phẩm.", time: "11:16 AM" }
            ]
        },
    ]);
    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = () => {
        if (newMessage.trim() === "") return;
        const currentTime = new Date().toLocaleTimeString();
        const updatedConversations = conversations.map(chat => {
            if (chat.id === selectedChat.id) {
                return { ...chat, messages: [...chat.messages, { sender: "Bạn", content: newMessage, time: currentTime }] };
            }
            return chat;
        });
        setConversations(updatedConversations);
        setNewMessage("");
    };

    return (
        <div className="flex h-screen p-4">
            {/* Danh sách cuộc trò chuyện */}
            <div className="w-1/3 bg-gray-100 rounded-lg p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-3">Tin nhắn</h2>
                <div className="mb-4 flex items-center bg-gray-200 rounded-lg p-2">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm tin nhắn..."
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                {conversations.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-3 rounded-lg cursor-pointer ${selectedChat.id === chat.id ? "bg-gray-300" : "hover:bg-gray-200"}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <FaUserCircle className="text-gray-500 text-2xl" />
                                <span>{chat.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{chat.messages[chat.messages.length - 1]?.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            {/* Khu vực hiển thị tin nhắn */}
            <div className="w-2/3 flex flex-col bg-white rounded-lg shadow-md p-4 ml-4">
                <div className="bg-gray-200 p-4 rounded-t-lg flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                </div>
                <div className="flex-grow overflow-y-auto space-y-3">
                    {selectedChat.messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "Bạn" ? "justify-end" : "justify-start"}`}>
                            <div className={`p-3 rounded-lg ${msg.sender === "Bạn" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                                <p>{msg.content}</p>
                                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Ô nhập tin nhắn */}
                <div className="mt-4 flex items-center bg-gray-100 rounded-lg p-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow p-2 bg-transparent focus:outline-none"
                        placeholder="Nhập tin nhắn..."
                    />
                    <button onClick={sendMessage} className="text-blue-500 text-xl hover:text-blue-700">
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messages;