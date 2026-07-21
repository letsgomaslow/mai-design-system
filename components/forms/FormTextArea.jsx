import React from "react";
export function FormTextArea({ label, id, placeholder, rows = 4, value, onChange }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      <label htmlFor={id} style={{font:"600 12px var(--font-primary)",letterSpacing:".4px",textTransform:"uppercase",color:"var(--maslow-dark-navy)"}}>{label}</label>
      <textarea id={id} placeholder={placeholder} rows={rows} value={value} onChange={onChange}
        style={{border:"none",borderBottom:"1px solid var(--border-hairline)",background:"transparent",font:"400 15px/24px var(--font-primary)",color:"var(--maslow-black)",outline:"none",padding:0,resize:"vertical"}}
        onFocus={e=>e.target.style.borderBottomColor="var(--focus-ring)"}
        onBlur={e=>e.target.style.borderBottomColor="var(--border-hairline)"} />
    </div>
  );
}