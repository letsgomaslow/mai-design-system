/**
 * 34px pill badge, 17px radius. Purple = CASE STUDY, orange = ARTICLE/FEATURED.
 * @dsComponent
 */
export interface PillBadgeProps {
  children: React.ReactNode;
  /** purple | orange | teal | navy, or any CSS color */
  color?: "purple" | "orange" | "teal" | "navy" | string;
}
export declare function PillBadge(props: PillBadgeProps): JSX.Element;