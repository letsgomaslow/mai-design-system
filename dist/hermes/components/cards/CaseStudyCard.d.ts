/**
 * 390×500 white card with offset stacked-paper shadow; featured = 548px + stronger shadow.
 * @dsComponent
 */
export interface CaseStudyCardProps {
  tag?: string;
  /** purple | orange | teal or CSS color */
  tagColor?: string;
  title: string;
  blurb?: string;
  cta?: string;
  href?: string;
  featured?: boolean;
}
export declare function CaseStudyCard(props: CaseStudyCardProps): JSX.Element;