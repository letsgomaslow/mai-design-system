/**
 * Off-white quote block with the large teal quote mark and metadata-caps attribution.
 * @dsComponent
 */
export interface TestimonialBlockProps {
  quote: string;
  /** e.g. "COO \u00B7 Manufacturing client" */
  attribution: string;
  source: string;
  evidenceStatus?: "production" | "modeled" | "illustrative" | "in_preparation";
  headshotSrc?: string;
  headshotAlt?: string;
}
export declare function TestimonialBlock(props: TestimonialBlockProps): JSX.Element;
