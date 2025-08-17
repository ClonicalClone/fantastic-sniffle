import React, { forwardRef } from 'react';

const Cursor2 = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => (
  <div
    ref={ref}
    className="w-4 h-4 bg-white rounded-full fixed top-0 left-0 pointer-events-none z-50"
    style={{ transform: 'translate(-50%, -50%) scale(1)' }}
    {...props}
  />
));

Cursor2.displayName = 'Cursor2';
export default Cursor2;
