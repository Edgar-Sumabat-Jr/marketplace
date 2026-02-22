import React from 'react';

function Rating({ value, text, color = '#f8e825' }) {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>
          <i
            style={{ color }}
            className={
              value >= i
                ? 'fa-solid fa-star'
                : value >= i - 0.5
                ? 'fa-solid fa-star-half-stroke'
                : 'fa-regular fa-star'
            }
          ></i>
        </span>
      ))}
      {text && <span> {text}</span>}
    </div>
  );
}

export default Rating;
