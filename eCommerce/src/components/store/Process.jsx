import React from "react";

const Process = () => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white text-sm">Đang xử lý...</p>
            </div>
        </div>
    );
};

export default Process;
