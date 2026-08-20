import React from "react";
export function FormInput({ label, id, type = "text", placeholder, value, onChange }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label htmlFor={id} style={{font:"600 12px var(--font-primary)",letterSpacing:".4px",textTransform:"uppercase",color:"var(--maslow-dark-navy)"}}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={{height:40,border:"none",borderBottom:"1px solid var(--border-hairline)",background:"transparent",font:"400 15px var(--font-primary)",color:"var(--maslow-black)",outline:"none",padding:0}}
        onFocus={e=>e.target.style.borderBottomColor="var(--focus-ring)"}
        onBlur={e=>e.target.style.borderBottomColor="var(--border-hairline)"} />
    </div>
  );
}