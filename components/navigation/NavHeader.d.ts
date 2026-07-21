/**
 * Site navigation header: gradient mark lockup left, uppercase links right. Height 83px.
 * @dsComponent
 */
export interface NavHeaderProps {
  /** Nav links, e.g. [{label:"Services",href:"#"}] */
  links?: { label: string; href: string }[];
  /** Label of the active link (rendered pink) */
  active?: string;
  logoHref?: string;
}
export declare function NavHeader(props: NavHeaderProps): JSX.Element;