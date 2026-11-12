import { Field } from "@/components/ui/field";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import type {
    ControllerProps,
    FieldPath,
    FieldPathByValue,
    FieldValues,
} from "react-hook-form";

export type FormOrientation =
    ComponentProps<typeof Field>["orientation"];

export type FormLabelPlacement = "start" | "end";

export type FormFieldIds = {
    control: string;
    description: string;
    error: string;
};

export type FormFieldRenderProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
> = Parameters<
    ControllerProps<
        TFieldValues,
        TName,
        TTransformedValues
    >["render"]
>[0] & {
    ids: FormFieldIds;
    invalid: boolean;
    required: boolean;
    disabled: boolean;
    ariaDescribedBy?: string;
};

export type FormFieldRules<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
> = ControllerProps<
    TFieldValues,
    TName,
    TTransformedValues
>["rules"];

export type FormFieldBaseProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
    TTransformedValues = TFieldValues,
> = {
    name: TName;
    render: (
        props: FormFieldRenderProps<
            TFieldValues,
            TName,
            TTransformedValues
        >
    ) => ReactElement;
    label?: ReactNode;
    description?: ReactNode;
    className?: string;
    orientation?: FormOrientation;
    labelPlacement?: FormLabelPlacement;
    showError?: boolean;
    required?: boolean;
    disabled?: boolean;
    rules?: FormFieldRules<
        TFieldValues,
        TName,
        TTransformedValues
    >;
    shouldUnregister?: boolean;
    defaultValue?: ControllerProps<
        TFieldValues,
        TName,
        TTransformedValues
    >["defaultValue"];
};

export type CheckboxOption = {
    value: string;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
};

export type SelectOption = {
    value: string;
    label: ReactNode;
    disabled?: boolean;
};

export type RadioOption = SelectOption & {
    description?: ReactNode;
};

export type StringFieldName<
    TFieldValues extends FieldValues,
> = FieldPathByValue<
    TFieldValues,
    string | null | undefined
>;

export type NumberFieldName<
    TFieldValues extends FieldValues,
> = FieldPathByValue<
    TFieldValues,
    number | null | undefined
>;

export type BooleanFieldName<
    TFieldValues extends FieldValues,
> = FieldPathByValue<
    TFieldValues,
    boolean | null | undefined
>;

export type DateFieldName<
    TFieldValues extends FieldValues,
> = FieldPathByValue<
    TFieldValues,
    Date | null | undefined
>;

export type StringArrayFieldName<
    TFieldValues extends FieldValues,
> = FieldPathByValue<
    TFieldValues,
    string[] | null | undefined
>;
