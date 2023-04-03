import React from "react";

export default function HoverMenu({ children }) {
  return (
    <div
      style={{
        width: "239px",
        // width: "270px",
        borderRadius: 24,
        position: "relative",
        padding: "8px 16px 8px",
      }}
    >
      <div
        style={{
          width: 117,
          height: 5,
          margin: "0 auto 16px",
          background: "var(--color-primary)",
          borderRadius: 5,
          // marginTop: 8,
        }}
      ></div>
      {children}
    </div>
  );
}
