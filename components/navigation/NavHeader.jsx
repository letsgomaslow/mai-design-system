import React from "react";
export function NavHeader({ links = [], active, logoHref = "#" }) {
  return (
    <nav aria-label="Main" style={{height:83,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px",background:"var(--surface-page)",borderBottom:"1px solid var(--maslow-nav-border)",fontFamily:"var(--font-primary)"}}>
      <a href={logoHref} style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
        <img src="assets/maslow-mark-gradient.svg" alt="Maslow AI" style={{width:36,height:23}} />
        <span style={{font:"600 13px var(--font-primary)",letterSpacing:"2px",color:"var(--maslow-dark-navy)"}}>MASLOW</span>
        <span style={{color:"var(--maslow-meta-grey)"}}>|</span>
        <span style={{font:"500 10px var(--font-mono)",letterSpacing:"3px",color:"var(--maslow-dark-navy)"}}>AI</span>
      </a>
      <div style={{display:"flex",gap:32}}>
        {links.map(l => (
          <a key={l.label} href={l.href} style={{font:"600 11px var(--font-primary)",letterSpacing:"1.4px",textTransform:"uppercase",color:l.label===active?"var(--action-link)":"var(--maslow-dark-navy)",textDecoration:"none"}}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}