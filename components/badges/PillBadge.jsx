import React from "react";
const COLORS = { purple:"var(--maslow-accent-purple)", orange:"var(--maslow-accent-orange)", teal:"var(--maslow-accent-teal)", navy:"var(--maslow-dark-navy)" };
export function PillBadge({ children, color = "purple" }) {
  return <span style={{height:34,display:"inline-flex",alignItems:"center",padding:"0 18px",borderRadius:17,background:COLORS[color]||color,font:"600 12px var(--font-primary)",letterSpacing:"2px",textTransform:"uppercase",color:"var(--maslow-white)"}}>{children}</span>;
}