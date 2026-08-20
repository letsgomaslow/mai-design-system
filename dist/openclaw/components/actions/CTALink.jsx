import React from "react";
export function CTALink({ children, href }) {
  if (!href) return null;
  return (
    <a href={href} style={{font:"700 9px var(--font-primary)",letterSpacing:"2px",textTransform:"uppercase",color:"var(--action-link)",textDecoration:"none"}}
       onMouseOver={e=>e.currentTarget.style.color="var(--action-link-hover)"}
       onMouseOut={e=>e.currentTarget.style.color="var(--action-link)"}>
      {children}{"\u00A0\u00A0>"}
    </a>
  );
}
