/**
 * Primary action button: 42px tall, 8px radius, hot-pink. Pink = action only.
 * @dsComponent
 */
export interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  /** primary (hot-pink) | dark (navy) | ghost (outline) */
  variant?: "primary" | "dark" | "ghost";
  onClick?: () => void;
}
export declare function CTAButton(props: CTAButtonProps): JSX.Element;