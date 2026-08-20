/**
 * Site navigation header: gradient mark lockup left, uppercase links right. Height 83px.
 * @dsComponent
 */
export interface NavHeaderProps {
  /** Nav links with real destinations. */
  links?: { label: string; href: string }[];
  /** Label of the active link, rendered in accessible purple. */
  active?: string;
  logoHref?: string;
}
export declare function NavHeader(props: NavHeaderProps): JSX.Element;
