/**
 * Dark-navy footer: white mark + "MASLOW" (no "| AI" — intentional), office status blocks.
 * @dsComponent
 */
export interface SiteFooterProps {
  /** Offices with open/closed status dots */
  offices?: { city: string; open?: boolean }[];
  /** Optional mono footnote, e.g. "© 2026" */
  note?: string;
}
export declare function SiteFooter(props: SiteFooterProps): JSX.Element;