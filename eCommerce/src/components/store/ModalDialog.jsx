import React from "react";

const ModalDialog = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white flex flex-col gap-7 opacity-100 w-[600px] rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto relative">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p>{message}</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onCancel} className='px-8 py-2 rounded-sm hover:bg-gray-50'>Hủy</button>
                    <button onClick={onConfirm} className='bg-red-600 px-8 py-2 rounded-sm hover:bg-red-500 text-white'>Xác nhận</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDialog;