import React from "react";
export function NavHeader({ links = [], active, logoHref = "/" }) {
  return (
    <nav aria-label="Main" style={{height:83,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px",background:"var(--surface-page)",borderBottom:"1px solid var(--maslow-nav-border)",fontFamily:"var(--font-primary)"}}>
      <a href={logoHref} style={{display:"flex",alignItems:"center",textDecoration:"none"}}>
        <img src="assets/logos/maslow-complete-full-color.png" alt="Maslow AI" style={{width:192,height:"auto"}} />
      </a>
      <div style={{display:"flex",gap:32}}>
        {links.map(l => (
          <a key={l.label} href={l.href} aria-current={l.label===active?"page":undefined} style={{font:"600 11px var(--font-primary)",letterSpacing:"1.4px",textTransform:"uppercase",color:l.label===active?"var(--action-link)":"var(--maslow-dark-navy)",textDecoration:"none"}}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}
