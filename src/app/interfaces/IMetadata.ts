export interface IFieldFormat {
    order?: number;
    type: string;
    label: string;
    pattern: string;
    options?: Array<{ label: string, value: string }>;
}

export interface IAttributes {
    [key: string]: IFieldFormat;
}