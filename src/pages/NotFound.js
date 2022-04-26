import React from 'react';
import rockGlass from '../images/rockGlass.svg';

function NotFound() {
  return (
    <div>
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
    </div>
  );
}

export default NotFound;
