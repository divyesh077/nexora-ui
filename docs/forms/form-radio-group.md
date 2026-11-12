# Form Radio Group

The `FormRadioGroup` component connects a group of radio options to React Hook Form.

It allows users to select exactly one option from a predefined list. Selected values are stored as strings.

For example, in a salon management application, you can use it to select an employee's employment type or preferred working shift.

## 1. Features

- React Hook Form integration.
- Type-safe string field names.
- Single-option selection.
- Custom option labels.
- Option descriptions.
- Disabled options.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom field styling.

## 2. Import

```tsx
import { FormRadioGroup } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Option Structure

The component accepts an array of radio options.

```tsx
type RadioOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};
```

Example:

```tsx
const employmentOptions = [
  {
    value: "full-time",
    label: "Full-time",
    description: "Regular full-time employment.",
  },
  {
    value: "part-time",
    label: "Part-time",
    description: "Reduced working hours.",
  },
  {
    value: "contract",
    label: "Contract",
    description: "Fixed-term employment.",
  },
  {
    value: "intern",
    label: "Intern",
    description: "Temporary internship.",
    disabled: true,
  },
];
```

Each option has a unique value and label. Descriptions and disabled states are optional.

## 4. Props

| Prop          | Type                            | Description                        |
| ------------- | ------------------------------- | ---------------------------------- |
| `name`        | `StringFieldName<TFieldValues>` | Name of the string form field.     |
| `options`     | `RadioOption[]`                 | Available radio options.           |
| `label`       | `ReactNode`                     | Group label.                       |
| `description` | `ReactNode`                     | Supporting group description.      |
| `orientation` | `FormOrientation`               | Group layout orientation.          |
| `required`    | `boolean`                       | Marks the group as required.       |
| `disabled`    | `boolean`                       | Disables the group.                |
| `showError`   | `boolean`                       | Controls error message visibility. |

Check the component implementation for the complete prop definition and additional styling properties.

## 5. Basic Usage

```tsx
<FormRadioGroup
  name="employmentType"
  label="Employment type"
  description="Select the employee's employment type."
  options={employmentOptions}
/>
```

The component automatically connects to the surrounding `Form` context.

## 6. Default Value

Initialize the field with the value of the selected option.

```tsx
const methods = useForm({
  defaultValues: {
    employmentType: "full-time",
  },
});
```

Only one option can be selected at a time.

## 7. Disabled Options

Use the `disabled` property to prevent users from selecting a particular option.

```tsx
const shiftOptions = [
  {
    value: "morning",
    label: "Morning shift",
  },
  {
    value: "evening",
    label: "Evening shift",
  },
  {
    value: "night",
    label: "Night shift",
    disabled: true,
  },
];
```

You can also disable the entire group using its `disabled` prop.

## 8. Validation with Zod

Use `z.enum()` when the field must contain one of a fixed set of values.

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  employmentType: z.enum(
    ["full-time", "part-time", "contract"],
    "Please select an employment type",
  ),
});
```

If the field is optional, model that explicitly in your schema.

Keep the allowed values synchronized with the options provided to the component.

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormRadioGroup,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  employmentType: z.enum(
    ["full-time", "part-time", "contract"],
    "Please select an employment type",
  ),
});

type FormValues = z.infer<typeof schema>;

const employmentOptions = [
  {
    value: "full-time",
    label: "Full-time",
    description: "Regular full-time employment.",
  },
  {
    value: "part-time",
    label: "Part-time",
    description: "Reduced working hours.",
  },
  {
    value: "contract",
    label: "Contract",
    description: "Fixed-term employment.",
  },
];

export function EmploymentForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      employmentType: "full-time",
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormRadioGroup
        name="employmentType"
        label="Employment type"
        description="Choose one employment type."
        options={employmentOptions}
        required
      />

      <FormSubmitButton>Save</FormSubmitButton>
    </Form>
  );
}
```

## 10. FormRadioGroup vs FormCheckboxGroup

| Component           | Selection        | Value type |
| ------------------- | ---------------- | ---------- |
| `FormRadioGroup`    | One option       | `string`   |
| `FormCheckboxGroup` | Multiple options | `string[]` |

Use radio groups when choices are mutually exclusive. Use checkbox groups when users can select multiple values.

## 11. Best Practices

- Use unique values for every option.
- Provide a meaningful label for each option.
- Use descriptions when choices need additional explanation.
- Initialize the field with a valid default value when appropriate.
- Use Zod to validate allowed values.
- Use checkbox groups when multiple selections are permitted.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Checkbox](./form-checkbox.md)
- [Form Checkbox Group](./form-checkbox-group.md)
- [Form Switch](./form-switch.md)
- [Validation](./validation.md)
