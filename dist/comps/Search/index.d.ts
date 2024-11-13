import { InputProps } from '../Input';
export type SearchProps = InputProps & {
    onSubmit?: (value: string) => void;
    onChange?: (value: string) => void;
    withStyle?: string;
};
declare const Search: import("react").ForwardRefExoticComponent<import("../../types").ZuzProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, keyof import("../../types").ZuzProps> & {
    numeric?: boolean;
} & {
    onSubmit?: (value: string) => void;
    onChange?: (value: string) => void;
    withStyle?: string;
} & import("react").RefAttributes<HTMLInputElement>>;
export default Search;
