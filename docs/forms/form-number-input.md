# Form Number Input

The `FormNumberInput` component connects a numeric input to React Hook Form.

It is designed for fields that store numeric values, such as age, salary, quantity, price, and duration.

Unlike a regular text input, it handles numeric values and converts an empty input value to `null` according to the component's implementation.

## 1. Features

- React Hook Form integration.
- Type-safe numeric field names.
- Numeric value handling.
- Empty-value handling.
- Support for `min`, `max`, and `step`.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom input and field styling.

## 2. Import

```tsx
import { FormNumberInput } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your installation target.

## 3. Props

The component combines shared form field props with numeric input properties.

| Prop             | Type                            | Description                        |
| ---------------- | ------------------------------- | ---------------------------------- |
| `name`           | `NumberFieldName<TFieldValues>` | Name of the numeric form field.    |
| `label`          | `ReactNode`                     | Field label.                       |
| `description`    | `ReactNode`                     | Supporting description.            |
| `placeholder`    | `string`                        | Input placeholder.                 |
| `min`            | `number`                        | Minimum permitted value.           |
| `max`            | `number`                        | Maximum permitted value.           |
| `step`           | `number`                        | Increment or decrement interval.   |
| `className`      | `string`                        | Styles the input element.          |
| `fieldClassName` | `string`                        | Styles the outer field wrapper.    |
| `required`       | `boolean`                       | Marks the field as required.       |
| `disabled`       | `boolean`                       | Disables the input.                |
| `showError`      | `boolean`                       | Controls error message visibility. |

Other supported properties depend on the actual component prop definition.

## 4. Basic Usage

```tsx
<FormNumberInput name="age" label="Age" placeholder="Enter age" />
```

The component connects to the surrounding `Form` context automatically.

## 5. Minimum, Maximum, and Step

Use `min`, `max`, and `step` to configure the numeric input.

```tsx
<FormNumberInput name="age" label="Age" min={18} max={65} step={1} />
```

For a price or salary field:

```tsx
<FormNumberInput name="salary" label="Monthly salary" min={0} step={100} />
```

These properties configure the input behavior. Use schema validation to enforce the actual application rules.

## 6. Empty Value Handling

The component converts an empty input value to `null` rather than retaining an empty string.

For example:

| Input  | Form value |
| ------ | ---------: |
| `25`   |       `25` |
| `1000` |     `1000` |
| Empty  |     `null` |

This behavior is useful when a numeric field is optional.

Make sure your schema and default values support the same representation.

## 7. Zod Validation

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  age: z
    .number()
    .int("Age must be a whole number")
    .min(18, "Minimum age is 18")
    .max(65, "Maximum age is 65")
    .nullable(),
});
```

If the value is required, add a refinement:

```tsx
export const employeeSchema = z.object({
  age: z
    .number()
    .int()
    .min(18)
    .max(65)
    .nullable()
    .refine((value) => value !== null, "Age is required"),
});
```

## 8. Custom Styling

Use separate class name properties for the input and outer field.

```tsx
<FormNumberInput
  name="salary"
  label="Monthly salary"
  className="text-right"
  fieldClassName="gap-3"
/>
```

| Prop             | Styles                |
| ---------------- | --------------------- |
| `className`      | Numeric input element |
| `fieldClassName` | Outer field wrapper   |

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormNumberInput,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  age: z
    .number()
    .int("Age must be a whole number")
    .min(18, "Minimum age is 18")
    .max(65, "Maximum age is 65")
    .nullable(),
});

type FormValues = z.infer<typeof schema>;

export function EmployeeAgeForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      age: null,
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormNumberInput
        name="age"
        label="Age"
        placeholder="Enter age"
        min={18}
        max={65}
        required
      />

      <FormSubmitButton>Save</FormSubmitButton>
    </Form>
  );
}
```

## 10. Best Practices

- Use `FormNumberInput` for numeric values rather than `FormInput`.
- Use `null` consistently for empty optional numeric fields.
- Configure `min`, `max`, and `step` where appropriate.
- Validate numeric values using your Zod schema.
- Keep the form's default value consistent with the schema.
- Do not rely only on HTML input constraints for application validation.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Input](./form-input.md)
- [Form Textarea](./form-textarea.md)
- [Validation](./validation.md)
