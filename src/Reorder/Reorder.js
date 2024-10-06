import React from "react";

function Reorder({ index, reorderObj, children }) {
  return (
    <div
      draggable
      onDragStart={() => (reorderObj.onCardRef.current = index)}
      onDragEnter={() => (reorderObj.overCardRef.current = index)}
      onDragEnd={reorderObj.handleSwap}
      onDragOver={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}

export default Reorder;
