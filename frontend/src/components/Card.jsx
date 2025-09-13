// components/Card.jsx
import React from 'react';

function Card({ title, description, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      {description && <p className="text-gray-600 mb-2">{description}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}

export default Card;
