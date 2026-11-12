# Form Select

The `FormSelect` component connects a selection control to React Hook Form.

It allows users to choose a single option from a predefined list. It combines the shared `FormField` functionality with the Nexora UI Select primitives.

## 1. Features

- React Hook Form integration.
- Type-safe field names.
- Single-option selection.
- Custom option labels and values.
- Disabled options.
- Placeholder support.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom styling for the field, content, and options.

## 2. Import

```tsx
import { FormSelect } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Option Structure

The component accepts an array of options.

```tsx
type SelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};
```

Example:

```tsx
const employmentOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  {
    value: "intern",
    label: "Intern",
    disabled: true,
  },
];
```

Each option has a unique value and a display label. An option can also be disabled.

## 4. Props

| Prop               | Type                            | Description                             |
| ------------------ | ------------------------------- | --------------------------------------- |
| `name`             | `StringFieldName<TFieldValues>` | Name of the string form field.          |
| `options`          | `SelectOption[]`                | Available selection options.            |
| `label`            | `ReactNode`                     | Field label.                            |
| `description`      | `ReactNode`                     | Supporting description.                 |
| `placeholder`      | `string`                        | Placeholder displayed before selection. |
| `fieldClassName`   | `string`                        | Styles the outer field wrapper.         |
| `contentClassName` | `string`                        | Styles the dropdown content.            |
| `itemClassName`    | `string`                        | Styles individual options.              |
| `required`         | `boolean`                       | Marks the field as required.            |
| `disabled`         | `boolean`                       | Disables the select control.            |
| `showError`        | `boolean`                       | Controls error message visibility.      |

The component may also support additional properties from its underlying Select primitive. Refer to the implementation for the exact public API.

## 5. Basic Usage

```tsx
<FormSelect
  name="employmentType"
  label="Employment type"
  placeholder="Select employment type"
  options={employmentOptions}
/>
```

The component automatically connects to the surrounding `Form` context.

## 6. Disabled Options

Use the `disabled` property to prevent users from selecting specific options.

```tsx
const serviceOptions = [
  { value: "haircut", label: "Haircut" },
  { value: "hair-color", label: "Hair coloring" },
  {
    value: "bridal",
    label: "Bridal package",
    disabled: true,
  },
];
```

```tsx
<FormSelect
  name="service"
  label="Service"
  placeholder="Choose a service"
  options={serviceOptions}
/>
```

## 7. Validation with Zod

Use a Zod schema to validate the selected value.

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  employmentType: z.string().min(1, "Please select an employment type"),
});
```

You can also restrict the accepted values:

```tsx
export const employeeSchema = z.object({
  employmentType: z.enum(["full-time", "part-time", "contract"]),
});
```

Keep the allowed values in your schema synchronized with the options provided to the component.

## 8. Custom Styling

The component exposes styling properties for the field and dropdown elements.

```tsx
<FormSelect
  name="employmentType"
  label="Employment type"
  placeholder="Select employment type"
  options={employmentOptions}
  fieldClassName="gap-3"
  contentClassName="max-h-60"
  itemClassName="cursor-pointer"
/>
```

| Prop               | Styles              |
| ------------------ | ------------------- |
| `fieldClassName`   | Outer field wrapper |
| `contentClassName` | Dropdown content    |
| `itemClassName`    | Individual options  |

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormSelect,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  employmentType: z.enum(["full-time", "part-time", "contract"]),
});

type FormValues = z.infer<typeof schema>;

const employmentOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
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
      <FormSelect
        name="employmentType"
        label="Employment type"
        placeholder="Select employment type"
        options={employmentOptions}
        required
      />

      <FormSubmitButton>Save</FormSubmitButton>
    </Form>
  );
}
```

## 10. Best Practices

- Use unique values for every option.
- Keep option values consistent with the validation schema.
- Provide a meaningful placeholder.
- Disable unavailable options instead of removing them when users should know they exist.
- Use a string field for single-value selection.
- Use a checkbox group when users need to select multiple options.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Checkbox](./form-checkbox.md)
- [Form Checkbox Group](./form-checkbox-group.md)
- [Form Radio Group](./form-radio-group.md)
- [Validation](./validation.md)
