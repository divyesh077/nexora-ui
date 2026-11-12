# Form Checkbox Group

The `FormCheckboxGroup` component connects a group of checkbox options to React Hook Form.

It allows users to select multiple options, with selected values stored as an array of strings.

For example, in a salon management application, an employee can be assigned multiple services.

## 1. Features

- React Hook Form integration.
- Type-safe string-array field names.
- Multiple selections.
- Custom option labels.
- Option descriptions.
- Disabled options.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom field styling.

## 2. Import

```tsx
import { FormCheckboxGroup } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Option Structure

The component accepts an array of checkbox options.

```tsx
type CheckboxOption = {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};
```

Example:

```tsx
const serviceOptions = [
  {
    value: "haircut",
    label: "Haircut",
    description: "Hair styling and cutting.",
  },
  {
    value: "hair-color",
    label: "Hair Coloring",
    description: "Hair coloring services.",
  },
  {
    value: "facial",
    label: "Facial",
    description: "Facial and skincare treatments.",
  },
  {
    value: "bridal",
    label: "Bridal Makeup",
    description: "Bridal makeup services.",
    disabled: true,
  },
];
```

Each option has a unique value and a display label. Descriptions and disabled states are optional.

## 4. Props

| Prop          | Type                                 | Description                          |
| ------------- | ------------------------------------ | ------------------------------------ |
| `name`        | `StringArrayFieldName<TFieldValues>` | Name of the string-array form field. |
| `options`     | `CheckboxOption[]`                   | Available checkbox options.          |
| `label`       | `ReactNode`                          | Group label.                         |
| `description` | `ReactNode`                          | Supporting group description.        |
| `orientation` | `FormOrientation`                    | Group layout orientation.            |
| `required`    | `boolean`                            | Marks the group as required.         |
| `disabled`    | `boolean`                            | Disables the group.                  |
| `showError`   | `boolean`                            | Controls error message visibility.   |
| `className`   | `string`                             | Styles the group container.          |

Check the component implementation for the complete prop definition and any additional styling properties.

## 5. Basic Usage

```tsx
<FormCheckboxGroup
  name="services"
  label="Assigned services"
  description="Select the services this employee can perform."
  options={serviceOptions}
/>
```

The component automatically connects to the surrounding `Form` context.

## 6. Default Values

Initialize the field with an array of selected option values.

```tsx
const methods = useForm({
  defaultValues: {
    services: ["haircut", "facial"],
  },
});
```

The selected checkboxes reflect the initial array.

## 7. Disabled Options

Disable individual options when users should not be able to select them.

```tsx
const serviceOptions = [
  {
    value: "haircut",
    label: "Haircut",
  },
  {
    value: "hair-color",
    label: "Hair Coloring",
    disabled: true,
  },
];
```

The group can also be disabled entirely using its `disabled` prop.

## 8. Validation with Zod

Use `z.array()` to validate multiple selections.

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
});
```

To restrict selections to known service values:

```tsx
export const employeeSchema = z.object({
  services: z
    .array(z.enum(["haircut", "hair-color", "facial", "bridal"]))
    .min(1, "Select at least one service"),
});
```

Keep the allowed values synchronized with the options provided to the component.

## 9. Custom Styling

Use the component's supported styling props to customize the group layout and appearance.

Refer to the implementation for the exact class name properties available in your version.

## 10. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormCheckboxGroup,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
});

type FormValues = z.infer<typeof schema>;

const serviceOptions = [
  {
    value: "haircut",
    label: "Haircut",
    description: "Hair styling and cutting.",
  },
  {
    value: "hair-color",
    label: "Hair Coloring",
    description: "Hair coloring services.",
  },
  {
    value: "facial",
    label: "Facial",
    description: "Facial and skincare treatments.",
  },
];

export function EmployeeServicesForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      services: [],
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormCheckboxGroup
        name="services"
        label="Assigned services"
        description="Select the services this employee can perform."
        options={serviceOptions}
        required
      />

      <FormSubmitButton>Save services</FormSubmitButton>
    </Form>
  );
}
```

## 11. FormCheckbox vs FormCheckboxGroup

| Component           | Value type | Use case                      |
| ------------------- | ---------- | ----------------------------- |
| `FormCheckbox`      | `boolean`  | Independent true/false value. |
| `FormCheckboxGroup` | `string[]` | Multiple selected options.    |

Use `FormCheckbox` for values such as `isActive` and `FormCheckboxGroup` for values such as `services`.

## 12. Best Practices

- Use unique option values.
- Initialize the field with an empty array when nothing is selected.
- Validate the minimum number of selections when necessary.
- Keep option values synchronized with your schema.
- Use disabled options for unavailable choices.
- Use `FormRadioGroup` when only one option can be selected.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Checkbox](./form-checkbox.md)
- [Form Radio Group](./form-radio-group.md)
- [Validation](./validation.md)
