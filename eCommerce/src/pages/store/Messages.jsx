import React, { useState } from "react";
import { FaEllipsisV, FaSearch, FaUserCircle, FaPaperPlane, FaRegCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthProvider";
import useChat from "../../components/customer/hook/useChat";

const Messages = () => {
    const [activeTab, setActiveTab] = useState('Tất cả');
    const tabs = ['Tất cả', 'Chưa đọc', 'Đã đọc', 'Đã lưu'];

    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: "Nguyễn Văn A",
            avatar: "/api/placeholder/40/40",
            lastActive: "Hoạt động 5 phút trước",
            unread: true,
            isOnline: true,
            startTime: "10:00 AM",
            messages: [
                { sender: "customer", content: "Chào shop, tôi muốn hỏi về đơn hàng #FSDT12345", time: "10:05 AM", read: true },
                { sender: "seller", content: "Xin chào quý khách, đơn hàng của bạn đang được chuẩn bị và sẽ được giao trong ngày mai.", time: "10:06 AM", read: true },
                { sender: "customer", content: "Cảm ơn shop. Còn một vấn đề nữa, tôi có thể thay đổi địa chỉ giao hàng không?", time: "10:07 AM", read: true },
                { sender: "seller", content: "Dạ, bạn có thể cung cấp địa chỉ mới cho chúng tôi. Chúng tôi sẽ cập nhật ngay lập tức.", time: "10:10 AM", read: true },
                { sender: "customer", content: "Địa chỉ mới là: 123 Nguyễn Văn Linh, Quận 7, TP.HCM", time: "10:15 AM", read: false }
            ]
        },
        {
            id: 2,
            name: "Trần Thị B",
            avatar: "/api/placeholder/40/40",
            lastActive: "Hoạt động 15 phút trước",
            unread: true,
            isOnline: false,
            startTime: "11:15 AM",
            messages: [
                { sender: "customer", content: "Shop ơi, sản phẩm điện thoại Samsung Galaxy S24 còn hàng không ạ?", time: "11:16 AM", read: true },
                { sender: "seller", content: "Dạ chào bạn, hiện sản phẩm này vẫn còn hàng. Bạn có muốn đặt hàng không ạ?", time: "11:18 AM", read: true },
                { sender: "customer", content: "Dạ, tôi muốn đặt một chiếc màu đen. Thời gian giao hàng mất bao lâu vậy?", time: "11:20 AM", read: false }
            ]
        },
        {
            id: 3,
            name: "Lê Văn C",
            avatar: "/api/placeholder/40/40",
            lastActive: "Hoạt động 1 giờ trước",
            unread: false,
            isOnline: false,
            startTime: "09:30 AM",
            messages: [
                { sender: "customer", content: "Tôi muốn hủy đơn hàng #FSDT78945", time: "09:30 AM", read: true },
                { sender: "seller", content: "Xin chào, vì sao bạn muốn hủy đơn hàng? Có vấn đề gì với sản phẩm hoặc dịch vụ của chúng tôi không?", time: "09:35 AM", read: true },
                { sender: "customer", content: "Tôi đã đặt nhầm sản phẩm.", time: "09:37 AM", read: true },
                { sender: "seller", content: "Tôi đã hủy đơn hàng của bạn. Tiền sẽ được hoàn lại trong 3-5 ngày làm việc.", time: "09:40 AM", read: true }
            ]
        },
        {
            id: 4,
            name: "Phạm Thị D",
            avatar: "/api/placeholder/40/40",
            lastActive: "Hoạt động 1 ngày trước",
            unread: false,
            isOnline: false,
            startTime: "Hôm qua",
            messages: [
                { sender: "customer", content: "Shop có giao hàng đến Đà Nẵng không?", time: "15:20 PM", read: true },
                { sender: "seller", content: "Dạ chào bạn, chúng tôi có giao hàng đến Đà Nẵng. Phí vận chuyển sẽ là 30.000đ và thời gian giao hàng khoảng 2-3 ngày.", time: "15:25 PM", read: true }
            ]
        },
    ]);

    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [newMessage, setNewMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAuth();
    const currentUser = { username: user?.username }


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const filteredConversations = conversations.filter(chat => {
        // Filter by search query
        if (searchQuery && !chat.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filter by tab
        if (activeTab === 'Chưa đọc' && !chat.unread) {
            return false;
        }
        if (activeTab === 'Đã đọc' && chat.unread) {
            return false;
        }

        return true;
    });

    const markAsRead = (chatId) => {
        const updatedConversations = conversations.map(chat => {
            if (chat.id === chatId) {
                const updatedMessages = chat.messages.map(msg => ({ ...msg, read: true }));
                return { ...chat, unread: false, messages: updatedMessages };
            }
            return chat;
        });
        setConversations(updatedConversations);
    };

    const selectChat = (chat) => {
        setSelectedChat(chat);
        markAsRead(chat.id);
    };

    const handleReceiveMessage = (payload) => {
        const { senderUsername, content } = payload;
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setConversations(prev => {
            const existing = prev.find(c => c.name === senderUsername);

            if (!existing) {
                const newConversation = {
                    id: Date.now(),
                    name: senderUsername,
                    avatar: "/api/placeholder/40/40",
                    lastActive: "Vừa xong",
                    unread: true,
                    isOnline: true,
                    startTime: currentTime,
                    messages: [{
                        sender: "customer",
                        content,
                        time: currentTime,
                        read: false
                    }]
                };
                return [newConversation, ...prev];
            } else {
                const updated = {
                    ...existing,
                    unread: true,
                    messages: [
                        ...existing.messages,
                        {
                            sender: "customer",
                            content,
                            time: currentTime,
                            read: false
                        }
                    ]
                };
                return [
                    updated,
                    ...prev.filter(c => c.name !== senderUsername)
                ];
            }
        });
        if (selectedChat?.name === senderUsername) {
            setSelectedChat(prev => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        sender: "customer",
                        content,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        read: false,
                    }
                ]
            }));
        }
    };

    const { sendMessage: sendViaSocket } = useChat(currentUser, selectedChat?.name, handleReceiveMessage);


    const sendMessage = () => {
        if (newMessage.trim() === "") return;

        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const updatedConversations = conversations.map(chat => {
            if (chat.id === selectedChat.id) {
                return {
                    ...chat,
                    messages: [...chat.messages, {
                        sender: "seller",
                        content: newMessage,
                        time: currentTime,
                        read: true
                    }]
                };
            }
            return chat;
        });

        setConversations(updatedConversations);
        setSelectedChat(updatedConversations.find(chat => chat.id === selectedChat.id));
        sendViaSocket(newMessage);
        setNewMessage("");
    };


    return (
        <div className="p-6 bg-white rounded-md shadow-sm flex h-[calc(100vh-120px)]">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 pr-4">
                <div className="mb-4">
                    <h1 className="text-xl font-bold text-gray-800">Tin nhắn</h1>
                    <p className="text-gray-500 text-sm">Quản lý các cuộc trò chuyện với khách hàng</p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 border-b-2 border-gray-200 mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-semibold transition text-sm
                                ${activeTab === tab ? 'border-b-3 border-purple-600 text-purple-600' : 'text-gray-600 hover:text-purple-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="mb-4 flex items-center bg-gray-100 rounded-lg p-2">
                    <FaSearch className="text-gray-500 mr-2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm tin nhắn..."
                        className="w-full bg-transparent outline-none text-sm"
                    />
                </div>

                {/* Conversation List */}
                <div className="overflow-y-auto h-[calc(100%-140px)]">
                    {filteredConversations.length > 0 ? (
                        filteredConversations.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => selectChat(chat)}
                                className={`p-3 rounded-lg cursor-pointer mb-2 border-l-4 ${selectedChat.id === chat.id
                                    ? "bg-purple-50 border-purple-500"
                                    : chat.unread
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-transparent hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="relative">
                                            <img
                                                src={chat.avatar}
                                                alt={chat.name}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            {chat.isOnline && (
                                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <span className={`font-medium ${chat.unread ? "text-black" : "text-gray-700"}`}>
                                                    {chat.name}
                                                </span>
                                                {chat.unread && (
                                                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                        Mới
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                {chat.messages[chat.messages.length - 1]?.content}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {chat.messages[chat.messages.length - 1]?.time}
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {chat.lastActive}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>Không tìm thấy cuộc trò chuyện nào</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            {selectedChat ? (
                <div className="w-2/3 flex flex-col pl-4">
                    {/* Chat Header */}
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="relative mr-3">
                                <img
                                    src={selectedChat.avatar}
                                    alt={selectedChat.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                {selectedChat.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-800">{selectedChat.name}</h2>
                                <p className="text-xs text-gray-500">{selectedChat.lastActive}</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button className="text-gray-500 hover:text-purple-600">
                                <FaRegCalendarAlt />
                            </button>
                            <button className="text-gray-500 hover:text-purple-600">
                                <FaInfoCircle />
                            </button>
                            <button className="text-gray-500 hover:text-purple-600">
                                <FaEllipsisV />
                            </button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-grow overflow-y-auto py-4" style={{ maxHeight: 'calc(100vh - 260px)' }}>
                        <div className="space-y-4">
                            {selectedChat.messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}>
                                    {msg.sender === "customer" && (
                                        <img src={selectedChat.avatar} alt={selectedChat.name} className="w-8 h-8 rounded-full mr-2 self-end" />
                                    )}
                                    <div
                                        className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "seller"
                                            ? "bg-purple-100 text-purple-900"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        <p className="text-sm">{msg.content}</p>
                                        <div className="flex items-center justify-end mt-1 space-x-1">
                                            <span className="text-xs text-gray-500">{msg.time}</span>
                                            {msg.sender === "seller" && (
                                                <span className="text-xs text-blue-500">
                                                    {msg.read ? "✓✓" : "✓"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 pt-3">
                        <div className="flex items-center bg-gray-100 rounded-lg p-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="flex-grow p-2 bg-transparent focus:outline-none text-sm"
                                placeholder="Nhập tin nhắn..."
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!newMessage.trim()}
                                className={`rounded-full p-2 ${newMessage.trim()
                                    ? "bg-purple-500 text-white hover:bg-purple-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500 mt-2 px-2">
                            <span>Phản hồi trong vòng 10 phút để không mất khách hàng</span>
                            <span>{newMessage.length}/500</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-2/3 flex flex-col justify-center items-center">
                    <div className="text-center text-gray-500">
                        <FaUserCircle className="text-6xl mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-medium mb-2">Chưa có cuộc trò chuyện nào được chọn</h3>
                        <p>Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;