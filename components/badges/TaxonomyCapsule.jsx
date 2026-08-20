import React from "react";

const COLORS = {
  purple: "var(--maslow-accent-purple)",
  orange: "var(--maslow-accent-orange)",
  teal: "var(--maslow-accent-teal)",
  navy: "var(--maslow-dark-navy)",
};

export function TaxonomyCapsule({ children, color = "purple" }) {
  return (
    <span
      data-taxonomy-label
      style={{
        height: 34,
        display: "inline-flex",
        alignItems: "center",
        padding: "0 18px",
        borderRadius: "var(--radius-capsule)",
        background: COLORS[color] || color,
        color: "var(--maslow-white)",
        cursor: "auto",
        font: "600 12px var(--font-primary)",
        letterSpacing: "2px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}
