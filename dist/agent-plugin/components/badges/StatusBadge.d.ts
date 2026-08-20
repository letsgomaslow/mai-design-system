/**
 * 16px status chip with green/red dot. Dot + text convey state together (a11y).
 * @dsComponent
 */
export interface StatusBadgeProps {
  children: React.ReactNode;
  /** true = green open dot, false = red closed dot */
  open?: boolean;
}
export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;