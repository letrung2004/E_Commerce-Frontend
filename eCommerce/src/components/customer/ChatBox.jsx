import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import useChat from './hook/useChat';

const ChatBox = ({ isOpen, onClose, currentUser, store }) => {
    if (!isOpen) return null;
    // console.log("store: ", store)
    const chats = [
        // {
        //     store: "Anessa Official Store",
        //     lastMessage: "[Chat AI Assistant] Xin chào...",
        //     messages: [
        //         { from: "bot", text: "Xin chào, tôi có thể giúp gì?" },
        //         { from: "user", text: "Sản phẩm này có miễn phí vận chuyển không?" },
        //         { from: "user", text: "Tôi có thể được giảm giá không?" }
        //     ],
        //     product: {
        //         name: "Sữa chống nắng bảo vệ hoàn hảo...",
        //         price: "₫535.000",
        //         image: "https://cf.shopee.vn/file/ee8c53becc4a15cf2927dd5949ebd7d6"
        //     }
        // },
        {
            store: store.name,
            logo: store.logo,
            lastMessage: "[Chat AI Assistant] Chúng tôi sẵn sàng hỗ trợ.",
            messages: [
                { from: "bot", text: "Xin chào, bạn cần hỗ trợ gì?" }
            ],
            product: null
        },
    ];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [inputMessage, setInputMessage] = useState("");

    const recipientUsername = store?.ownerName; // sẽ tùy biến sau
    const { messages, sendMessage } = useChat(currentUser, recipientUsername);

    const handleSend = () => {
        if (inputMessage.trim()) {
            sendMessage(inputMessage.trim());
            setInputMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };


    return (
        <div className="fixed bottom-0 right-0 z-50 w-[45%] shadow-xl bg-white rounded-tl-lg border border-gray-300 overflow-hidden text-sm font-sans">
            <div className="h-[500px] flex flex-col">
                {/* Header */}
                <div className="w-full bg-gray-50 border-b border-gray-300 flex justify-between">
                    <div className="w-full px-3 py-2 font-semibold bg-white text-purple-600">Chat</div>
                    <button onClick={onClose} className='bg-white px-3'>
                        <X size={18} className="text-gray-500 hover:text-red-500" />
                    </button>
                </div>

                {/* Nội dung chính */}
                <div className="flex-1 flex relative h-full">
                    {/* Sidebar */}
                    <div className="w-[33%] overflow-y-auto border-r border-gray-300">
                        {chats &&

                            chats.map((chat, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedIndex(i)}
                                    className={`flex items-center gap-2 px-4 py-4 hover:bg-gray-100 cursor-pointer ${i === selectedIndex ? "bg-gray-100" : ""}`}
                                >
                                    {/* <div className="w-8 h-8 bg-gray-300 rounded-full shrink-0" /> */}
                                    <img src={store.logo} alt={store.name} className="w-8 h-8 rounded-full object-cover" />
                                    <div className="flex flex-col justify-center truncate">
                                        <span className="font-semibold text-[13px] truncate">{chat.store}</span>
                                        <span className="text-xs text-gray-500 truncate">{chat.lastMessage}</span>
                                    </div>
                                </div>
                            ))

                        }
                    </div>


                    {/* Chat content */}
                    <div className="w-[67%] flex flex-col h-full">
                        {/* Chat Header */}
                        <div className="px-4 py-2 border-b border-gray-300 bg-white">
                            <span className="font-semibold">{store.name}</span>
                        </div>

                        {/* Product Preview */}
                        {/* {selectedChat.product && (
                            <div className="px-4 py-2 border-b border-gray-300 bg-white text-xs flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={selectedChat.product.image} className="w-10 h-10 border rounded object-cover" />
                                    <div>
                                        <div className="line-clamp-1">{selectedChat.product.name}</div>
                                        <div className="text-red-600 font-semibold">{selectedChat.product.price}</div>
                                    </div>
                                </div>
                                <button className="text-xs border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-50">Mua ngay</button>
                            </div>
                        )} */}

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-3 space-y-2">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2 rounded shadow w-fit max-w-[80%] ${msg.from === "user"
                                        ? "ml-auto text-blue-700 bg-blue-100"
                                        : "text-gray-700 bg-white"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </div>


                        {/* Input */}
                        <div className=" flex z-51 border-t border-gray-300 bg-white p-3">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Nhập nội dung tin nhắn"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button className="p-2  text-purple-600 rounded hover:text-purple-400 cursor-pointer"
                                onClick={handleSend}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ChatBox;


