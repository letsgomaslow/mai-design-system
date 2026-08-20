/**
 * Square primary action: navy on light surfaces or white on dark surfaces.
 * @dsComponent
 */
export interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  /** primary (navy) | inverse (white) | ghost (outline) */
  variant?: "primary" | "inverse" | "ghost";
  onClick?: () => void;
}
export declare function CTAButton(props: CTAButtonProps): JSX.Element;
