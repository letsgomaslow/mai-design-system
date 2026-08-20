import React from "react";
export function StatBlock({ stats = [], evidenceStatus = "illustrative", source = "Example only" }) {
  const colors = ["var(--maslow-accent-teal)","var(--maslow-accent-purple)","var(--maslow-bright-yellow)"];
  return (
    <div data-evidence-status={evidenceStatus} data-evidence-source={source} style={{background:"var(--surface-dark)",padding:"64px 48px",display:"grid",gridTemplateColumns:`repeat(${stats.length||3},1fr)`,gap:32}}>
      {stats.map((s,i) => (
        <div key={i}>
          <div style={{font:"400 38px/42px var(--font-primary)",letterSpacing:"-.89px",color:s.color||colors[i%3]}}>{s.value}</div>
          <div style={{font:"400 17px/27px var(--font-primary)",color:"var(--maslow-white)",marginTop:8}}>{s.label}</div>
        </div>
      ))}
      <div style={{gridColumn:"1 / -1",font:"500 10px var(--font-mono)",letterSpacing:"2px",textTransform:"uppercase",color:"var(--maslow-dark-text-secondary)"}}>{evidenceStatus} · {source}</div>
    </div>
  );
}
