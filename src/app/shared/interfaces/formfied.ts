export interface FormField {
    type: string;
    label: string;
    name: string;
    placeholder?: string;
    options?: { label: string; value: any }[];
    validators?: { [key: string]: any };
    customClass?: string;
    style?: { [key: string]: string };
    errorMessages?: { [key: string]: string };
    accept?: string[];
}