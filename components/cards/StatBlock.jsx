import React from "react";
export function StatBlock({ stats = [] }) {
  const colors = ["var(--maslow-accent-teal)","var(--maslow-accent-purple)","var(--maslow-bright-yellow)"];
  return (
    <div style={{background:"var(--surface-dark)",padding:"64px 48px",display:"grid",gridTemplateColumns:`repeat(${stats.length||3},1fr)`,gap:32}}>
      {stats.map((s,i) => (
        <div key={i}>
          <div style={{font:"400 38px/42px var(--font-primary)",letterSpacing:"-.89px",color:s.color||colors[i%3]}}>{s.value}</div>
          <div style={{font:"400 17px/27px var(--font-primary)",color:"var(--maslow-white)",marginTop:8}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}