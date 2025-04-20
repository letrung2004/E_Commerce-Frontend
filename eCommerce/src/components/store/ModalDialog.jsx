import React from "react";

const ModalDialog = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 backdrop-blur-md bg-opacity-10"></div>
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg z-10">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p>{message}</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Hủy</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDialog;