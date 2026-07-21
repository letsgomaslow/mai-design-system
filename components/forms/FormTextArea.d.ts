/**
 * Underline-style textarea matching FormInput; full-width message field in contact forms.
 * @dsComponent
 */
export interface FormTextAreaProps {
  label: string;
  id: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: any) => void;
}
export declare function FormTextArea(props: FormTextAreaProps): JSX.Element;