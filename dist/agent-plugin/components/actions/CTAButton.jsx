import React from "react";
export function CTAButton({ children, href, variant = "primary", onClick }) {
  const base = {height:42,display:"inline-flex",alignItems:"center",padding:"0 18px",borderRadius:0,font:"600 12px var(--font-primary)",letterSpacing:"2px",textTransform:"uppercase",textDecoration:"none",cursor:"pointer",border:"none"};
  const looks = {
    primary:{background:"var(--action-button)",color:"var(--action-button-ink)"},
    inverse:{background:"var(--action-inverse)",color:"var(--action-inverse-ink)"},
    ghost:{background:"transparent",color:"var(--maslow-dark-navy)",boxShadow:"inset 0 0 0 1px var(--maslow-dark-navy)"}
  };
  return href
    ? <a href={href} onClick={onClick} style={{...base,...looks[variant]}}>{children}</a>
    : <button type="button" onClick={onClick} style={{...base,...looks[variant]}}>{children}</button>;
}
