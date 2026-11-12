# Form Switch

The `FormSwitch` component connects a boolean switch control to React Hook Form.

It combines the shared `FormField` functionality with the Nexora UI Switch primitive.

Use it for settings that enable or disable a feature, such as employee availability, appointment notifications, or service visibility.

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
import { FormSwitch } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Props

The component combines shared form field props with the underlying Switch properties.

| Prop             | Type                             | Description                        |
| ---------------- | -------------------------------- | ---------------------------------- |
| `name`           | `BooleanFieldName<TFieldValues>` | Name of the boolean form field.    |
| `label`          | `ReactNode`                      | Switch label.                      |
| `description`    | `ReactNode`                      | Supporting description.            |
| `className`      | `string`                         | Styles the switch control.         |
| `fieldClassName` | `string`                         | Styles the outer field wrapper.    |
| `orientation`    | `FormOrientation`                | Field layout orientation.          |
| `required`       | `boolean`                        | Marks the field as required.       |
| `disabled`       | `boolean`                        | Disables the switch.               |
| `showError`      | `boolean`                        | Controls error message visibility. |

Other supported properties depend on the actual component prop definition.

## 4. Basic Usage

```tsx
<FormSwitch name="isActive" label="Active employee" />
```

The component automatically connects to the surrounding `Form` context.

## 5. Label and Description

```tsx
<FormSwitch
  name="notificationsEnabled"
  label="Appointment notifications"
  description="Receive notifications about upcoming appointments."
/>
```

The shared field implementation handles the label and description.

## 6. Default Values

Initialize boolean fields with explicit default values.

```tsx
const methods = useForm({
  defaultValues: {
    isActive: true,
    notificationsEnabled: false,
  },
});
```

The switch reflects the initial value when the form renders.

## 7. Validation with Zod

Use a boolean schema to validate the switch value.

```tsx
import * as z from "zod";

export const settingsSchema = z.object({
  notificationsEnabled: z.boolean(),
});
```

If the user must explicitly enable a setting, use a refinement:

```tsx
export const settingsSchema = z.object({
  notificationsEnabled: z
    .boolean()
    .refine((value) => value, "You must enable notifications"),
});
```

The `required` prop communicates the required state to the UI. It does not replace schema validation.

## 8. Custom Styling

Use separate class name properties for the switch and its outer field.

```tsx
<FormSwitch
  name="isActive"
  label="Active employee"
  className="data-[checked]:bg-primary"
  fieldClassName="items-center"
/>
```

| Prop             | Styles              |
| ---------------- | ------------------- |
| `className`      | Switch control      |
| `fieldClassName` | Outer field wrapper |

Use the class names supported by your underlying Base UI Switch implementation.

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormSwitch,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  isActive: z.boolean(),
  notificationsEnabled: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function EmployeeSettingsForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isActive: true,
      notificationsEnabled: false,
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormSwitch
        name="isActive"
        label="Active employee"
        description="Enable or disable this employee."
      />

      <FormSwitch
        name="notificationsEnabled"
        label="Appointment notifications"
        description="Receive appointment reminders."
      />

      <FormSubmitButton>Save settings</FormSubmitButton>
    </Form>
  );
}
```

## 10. FormSwitch vs FormCheckbox

| Component      | Recommended use                                            |
| -------------- | ---------------------------------------------------------- |
| `FormSwitch`   | Enable or disable a setting.                               |
| `FormCheckbox` | Select an independent boolean option or confirm an action. |

Use a switch for settings that take effect immediately or represent an on/off state. Use a checkbox for explicit choices, such as accepting terms and conditions.

## 11. Best Practices

- Use boolean values for switch fields.
- Initialize fields with explicit defaults.
- Use switches for on/off settings.
- Use schema validation when a particular state is mandatory.
- Provide a clear label describing what the switch controls.
- Do not use switches for mutually exclusive options.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Checkbox](./form-checkbox.md)
- [Form Radio Group](./form-radio-group.md)
- [Validation](./validation.md)
