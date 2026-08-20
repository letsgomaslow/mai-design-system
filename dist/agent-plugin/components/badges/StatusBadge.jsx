import React from "react";
export function StatusBadge({ children, open = true }) {
  return (
    <span style={{height:16,display:"inline-flex",alignItems:"center",gap:6,padding:"0 8px",borderRadius:0,background:"var(--maslow-nav-border)",font:"500 7px var(--font-primary)",letterSpacing:".4px",textTransform:"uppercase",color:"var(--maslow-black)"}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:open?"var(--maslow-open-green)":"var(--maslow-closed-red)"}} />{children}
    </span>
  );
}
