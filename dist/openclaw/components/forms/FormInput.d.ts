/**
 * Underline-style input: transparent, 1px bottom hairline, purple on focus. Always labeled.
 * @dsComponent
 */
export interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare function FormInput(props: FormInputProps): JSX.Element;
