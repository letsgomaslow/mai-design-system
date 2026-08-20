/**
 * Non-interactive content-classification label. It never accepts link,
 * button, focus, or event props.
 * @dsComponent
 */
export interface TaxonomyCapsuleProps {
  children: React.ReactNode;
  /** purple | orange | teal | navy, or an approved CSS color token */
  color?: "purple" | "orange" | "teal" | "navy" | string;
}
export declare function TaxonomyCapsule(props: TaxonomyCapsuleProps): JSX.Element;
