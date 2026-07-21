import React from "react";
export function CTAButton({ children, href = "#", variant = "primary", onClick }) {
  const base = {height:42,display:"inline-flex",alignItems:"center",padding:"0 18px",borderRadius:8,font:"600 12px var(--font-primary)",letterSpacing:"2px",textTransform:"uppercase",textDecoration:"none",cursor:"pointer",border:"none"};
  const looks = {
    primary:{background:"var(--action-button)",color:"var(--maslow-white)"},
    dark:{background:"var(--maslow-dark-navy)",color:"var(--maslow-white)"},
    ghost:{background:"transparent",color:"var(--maslow-dark-navy)",boxShadow:"inset 0 0 0 1px var(--maslow-dark-navy)"}
  };
  return <a href={href} onClick={onClick} style={{...base,...looks[variant]}}>{children}</a>;
}