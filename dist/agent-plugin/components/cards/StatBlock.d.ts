/**
 * Full-bleed navy stats band: colored numbers (teal/purple/yellow rotation), white labels.
 * @dsComponent
 */
export interface StatBlockProps {
  stats: { value: string; label: string; color?: string }[];
  evidenceStatus: "production" | "modeled" | "illustrative" | "in_preparation";
  source: string;
}
export declare function StatBlock(props: StatBlockProps): JSX.Element;
