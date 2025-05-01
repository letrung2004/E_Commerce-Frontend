import React, { useState } from 'react';

const StarRating = ({ rating, onChange }) => {
  return (
    <div className="flex items-center gap-1 text-4xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={`cursor-pointer ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating