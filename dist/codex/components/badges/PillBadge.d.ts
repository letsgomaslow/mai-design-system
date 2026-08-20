/**
 * Legacy name for the non-interactive TaxonomyCapsule component.
 * @dsComponent
 */
export interface PillBadgeProps {
  children: React.ReactNode;
  /** purple | orange | teal | navy, or an approved CSS color token */
  color?: "purple" | "orange" | "teal" | "navy" | string;
}
export declare function PillBadge(props: PillBadgeProps): JSX.Element;
