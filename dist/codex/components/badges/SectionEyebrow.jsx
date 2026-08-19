import React from "react";
export function SectionEyebrow({ num, children, color = "var(--maslow-label-purple)" }) {
  return <div style={{font:"500 11px var(--font-mono)",letterSpacing:"3px",textTransform:"uppercase",color}}>{num ? num + " \u00B7 " : ""}{children}</div>;
}