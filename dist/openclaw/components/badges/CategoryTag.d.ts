/**
 * Text-only category tag colored by pillar (strategy purple / technology teal / design orange).
 * @dsComponent
 */
export interface CategoryTagProps {
  /** strategy | technology | design, or any CSS color */
  pillar?: "strategy" | "technology" | "design" | string;
  children?: React.ReactNode;
}
export declare function CategoryTag(props: CategoryTagProps): JSX.Element;