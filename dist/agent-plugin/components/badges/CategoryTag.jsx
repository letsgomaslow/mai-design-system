import React from "react";
const PILLARS = { strategy:"var(--pillar-strategy)", technology:"var(--pillar-technology)", design:"var(--pillar-design)" };
export function CategoryTag({ pillar = "technology", children }) {
  return <span style={{font:"700 12px var(--font-meta)",letterSpacing:"2px",textTransform:"uppercase",color:PILLARS[pillar]||pillar}}>{children || pillar}</span>;
}