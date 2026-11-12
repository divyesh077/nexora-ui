# Form Checkbox

The `FormCheckbox` component connects a boolean checkbox control to React Hook Form.

It combines the shared `FormField` functionality with the Nexora UI Checkbox primitive.

Use it for independent boolean values such as accepting terms, enabling notifications, or confirming an action.

## 1. Features

- React Hook Form integration.
- Type-safe boolean field names.
- Controlled checked state.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom styling.
- Accessible field integration.

## 2. Import

```tsx
import { FormCheckbox } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Props

The component combines shared form field props with the underlying Checkbox properties.

| Prop             | Type                             | Description                        |
| ---------------- | -------------------------------- | ---------------------------------- |
| `name`           | `BooleanFieldName<TFieldValues>` | Name of the boolean form field.    |
| `label`          | `ReactNode`                      | Checkbox label.                    |
| `description`    | `ReactNode`                      | Supporting description.            |
| `className`      | `string`                         | Styles the checkbox control.       |
| `fieldClassName` | `string`                         | Styles the outer field wrapper.    |
| `required`       | `boolean`                        | Marks the field as required.       |
| `disabled`       | `boolean`                        | Disables the checkbox.             |
| `showError`      | `boolean`                        | Controls error message visibility. |

Other supported properties depend on the actual component prop definition.

## 4. Basic Usage

```tsx
<FormCheckbox name="isActive" label="Active employee" />
```

The component automatically connects to the surrounding `Form` context.

## 5. Label and Description

```tsx
<FormCheckbox
  name="notifications"
  label="Email notifications"
  description="Receive updates about appointments and services."
/>
```

The shared field implementation handles the label and description.

## 6. Required Checkbox

Use a Zod refinement when the user must explicitly accept or confirm something.

```tsx
import * as z from "zod";

export const termsSchema = z.object({
  termsAccepted: z
    .boolean()
    .refine(
      (value) => value === true,
      "You must accept the terms and conditions",
    ),
});
```

```tsx
<FormCheckbox
  name="termsAccepted"
  label="I accept the terms and conditions"
  required
/>
```

The `required` prop communicates the required state to the UI. Schema validation enforces the actual submission requirement.

## 7. Default Values

Initialize boolean fields with explicit default values.

```tsx
const methods = useForm({
  defaultValues: {
    isActive: true,
    notifications: false,
    termsAccepted: false,
  },
});
```

This keeps the checkbox state predictable.

## 8. Custom Styling

```tsx
<FormCheckbox
  name="isActive"
  label="Active employee"
  className="rounded-sm"
  fieldClassName="items-center"
/>
```

| Prop             | Styles              |
| ---------------- | ------------------- |
| `className`      | Checkbox control    |
| `fieldClassName` | Outer field wrapper |

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormCheckbox,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  isActive: z.boolean(),
  termsAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

type FormValues = z.infer<typeof schema>;

export function SettingsForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: true,
      termsAccepted: false,
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormCheckbox
        name="isActive"
        label="Active employee"
        description="Enable or disable this employee."
      />

      <FormCheckbox
        name="termsAccepted"
        label="I accept the terms and conditions"
        required
      />

      <FormSubmitButton>Save settings</FormSubmitButton>
    </Form>
  );
}
```

## 10. FormCheckbox vs FormCheckboxGroup

| Component           | Use case                                |
| ------------------- | --------------------------------------- |
| `FormCheckbox`      | One independent boolean value.          |
| `FormCheckboxGroup` | Multiple selections stored in an array. |

For example, use `FormCheckbox` for `isActive` and `FormCheckboxGroup` for selecting multiple salon services.

## 11. Best Practices

- Use boolean fields for independent checkbox values.
- Initialize fields with explicit boolean defaults.
- Use Zod refinements for mandatory acceptance.
- Use `FormCheckboxGroup` for multiple selections.
- Do not use a checkbox for mutually exclusive choices; use `FormRadioGroup` instead.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Checkbox Group](./form-checkbox-group.md)
- [Form Radio Group](./form-radio-group.md)
- [Form Switch](./form-switch.md)
- [Validation](./validation.md)
