import React from "react";
export function SiteFooter({ offices = [], note = "" }) {
  return (
    <footer style={{background:"var(--maslow-dark-navy)",padding:"40px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",fontFamily:"var(--font-primary)"}}>
      <span style={{display:"flex",alignItems:"center",gap:10}}>
        <img src="assets/maslow-mark-white.svg" alt="Maslow" style={{width:30,height:19}} />
        <span style={{font:"600 12px var(--font-primary)",letterSpacing:"2px",color:"var(--maslow-white)"}}>MASLOW</span>
      </span>
      <div style={{display:"flex",gap:32,alignItems:"center"}}>
        {offices.map(o => (
          <span key={o.city} style={{display:"inline-flex",alignItems:"center",gap:6,font:"500 10px var(--font-primary)",letterSpacing:".4px",textTransform:"uppercase",color:"var(--maslow-dark-text-secondary)"}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:o.open?"var(--maslow-open-green)":"var(--maslow-closed-red)"}} />{o.city}
          </span>
        ))}
        {note && <span style={{font:"400 10px var(--font-mono)",color:"var(--maslow-dark-text-secondary)"}}>{note}</span>}
      </div>
    </footer>
  );
}