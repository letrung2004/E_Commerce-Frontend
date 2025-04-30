import React from 'react'
import { authAPIs, endpoints } from '../../../configs/APIs';

const ReviewModal = ({isOpen, onClose, addressId, onRemovedSuccess}) => {
    if (isOpen===false) return null;
    console.log("address ID : ", addressId)

    
    const handleRemoveAddress = async (addressId) => {
        try {
            let response = await authAPIs().delete(endpoints.removeAddress(addressId))
            if (response.status === 200) {
                if (onRemovedSuccess) onRemovedSuccess(response.data)
                console.log("REMOVED")

            } else {
                console.log("FAILED");
            }

        } catch (error) {

        } finally {

        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
            <div className="bg-white flex flex-col gap-7 opacity-100 w-[600px] rounded shadow-lg p-6 max-h-[90vh] overflow-y-auto relative">
                <span>Đánh giá</span>
                <div className='flex justify-end gap-x-2'>
                    <button className='px-8 py-2 rounded-sm hover:bg-gray-50'
                     onClick={onClose}>TRỞ VỀ</button>
                    <button
                        className='bg-red-600 px-8 py-2 rounded-sm hover:bg-red-500 text-white'
                        
                    >XÓA</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewModal