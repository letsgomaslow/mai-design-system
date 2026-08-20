import React from "react";
import { TaxonomyCapsule } from "./TaxonomyCapsule.jsx";

export function PillBadge({ children, color = "purple" }) {
  return <TaxonomyCapsule color={color}>{children}</TaxonomyCapsule>;
}
