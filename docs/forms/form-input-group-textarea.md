# Form Input Group Textarea

The `FormInputGroupTextarea` component connects a multiline input-group textarea to React Hook Form.

It combines the shared `FormField` functionality with the Nexora UI `InputGroup` and `InputGroupTextarea` primitives.

It is useful when a multiline field needs supporting content, such as an icon, label, or action button positioned around the textarea.

## 1. Features

- React Hook Form integration.
- Type-safe string field names.
- Multiline text input.
- Start and end addons.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Separate styling for the field, input group, textarea, and addons.

## 2. Import

```tsx
import { FormInputGroupTextarea } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Props

The component combines shared form field props with textarea and input-group properties.

| Prop                  | Type                            | Description                                        |
| --------------------- | ------------------------------- | -------------------------------------------------- |
| `name`                | `StringFieldName<TFieldValues>` | Name of the string form field.                     |
| `label`               | `ReactNode`                     | Field label.                                       |
| `description`         | `ReactNode`                     | Supporting description.                            |
| `placeholder`         | `string`                        | Textarea placeholder.                              |
| `startAddon`          | `ReactNode`                     | Content displayed at the start of the input group. |
| `endAddon`            | `ReactNode`                     | Content displayed at the end of the input group.   |
| `fieldClassName`      | `string`                        | Styles the outer field wrapper.                    |
| `inputGroupClassName` | `string`                        | Styles the input group container.                  |
| `textareaClassName`   | `string`                        | Styles the textarea element.                       |
| `startAddonClassName` | `string`                        | Styles the start addon.                            |
| `endAddonClassName`   | `string`                        | Styles the end addon.                              |
| `required`            | `boolean`                       | Marks the field as required.                       |
| `disabled`            | `boolean`                       | Disables the textarea.                             |
| `showError`           | `boolean`                       | Controls error message visibility.                 |

Other supported textarea properties depend on the actual component prop definition.

## 4. Basic Usage

```tsx
<FormInputGroupTextarea
  name="address"
  label="Address"
  placeholder="Enter your address"
/>
```

The component automatically connects to the surrounding `Form` context.

## 5. Start Addon

Use `startAddon` to display supporting content at the start of the input group.

```tsx
<FormInputGroupTextarea
  name="description"
  label="Description"
  placeholder="Enter description..."
  startAddon={<FileTextIcon />}
/>
```

## 6. End Addon

Use `endAddon` to display supporting content at the end of the input group.

```tsx
<FormInputGroupTextarea
  name="notes"
  label="Notes"
  placeholder="Enter notes..."
  endAddon="Internal"
/>
```

## 7. Custom Styling

Each major element has its own styling property.

```tsx
<FormInputGroupTextarea
  name="address"
  label="Address"
  placeholder="Enter address..."
  fieldClassName="gap-3"
  inputGroupClassName="rounded-lg"
  textareaClassName="min-h-32 resize-y"
  startAddonClassName="text-muted-foreground"
  endAddonClassName="text-muted-foreground"
/>
```

| Prop                  | Styles                |
| --------------------- | --------------------- |
| `fieldClassName`      | Outer field wrapper   |
| `inputGroupClassName` | Input group container |
| `textareaClassName`   | Textarea element      |
| `startAddonClassName` | Start addon           |
| `endAddonClassName`   | End addon             |

## 8. Validation Example

```tsx
import * as z from "zod";

export const addressSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Address must contain at least 5 characters")
    .max(250, "Address cannot exceed 250 characters"),
});
```

Validation errors are displayed through the shared field implementation.

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormInputGroupTextarea,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Address is required")
    .max(250, "Address cannot exceed 250 characters"),
});

type FormValues = z.infer<typeof schema>;

export function AddressForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormInputGroupTextarea
        name="address"
        label="Address"
        description="Enter the complete address."
        placeholder="Enter address..."
        textareaClassName="min-h-32"
      />

      <FormSubmitButton>Save address</FormSubmitButton>
    </Form>
  );
}
```

## 10. Best Practices

- Use this component when a multiline field needs input-group addons.
- Use `FormTextarea` for ordinary multiline fields.
- Keep validation rules in your Zod schema.
- Use `textareaClassName` for textarea-specific styling.
- Keep decorative addon content separate from the actual field value.
- Ensure the textarea has sufficient height for its expected content.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Textarea](./form-textarea.md)
- [Form Input Group](./form-input-group.md)
- [Validation](./validation.md)
