/**
 * Numbered mono eyebrow ("01 · PRINCIPLES") — the core 2026 section-opener pattern.
 * @dsComponent
 */
export interface SectionEyebrowProps {
  /** Section number as string, e.g. "01" */
  num?: string;
  children: React.ReactNode;
  /** Defaults to label-purple; teal on dark bands */
  color?: string;
}
export declare function SectionEyebrow(props: SectionEyebrowProps): JSX.Element;