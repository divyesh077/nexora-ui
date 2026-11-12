# Form Textarea

The `FormTextarea` component connects a multiline text control to React Hook Form.

It is useful for fields that accept longer text, such as descriptions, notes, comments, addresses, and instructions.

It combines the shared `FormField` functionality with the Nexora UI `Textarea` primitive.

## 1. Features

- React Hook Form integration.
- Type-safe string field names.
- Multiline text input.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom textarea styling.
- Custom outer field styling.
- Support for textarea attributes.

## 2. Import

```tsx
import { FormTextarea } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Props

The component combines shared form field props with the underlying textarea properties.

| Prop             | Type                            | Description                        |
| ---------------- | ------------------------------- | ---------------------------------- |
| `name`           | `StringFieldName<TFieldValues>` | Name of the string form field.     |
| `label`          | `ReactNode`                     | Field label.                       |
| `description`    | `ReactNode`                     | Supporting description.            |
| `placeholder`    | `string`                        | Placeholder text.                  |
| `rows`           | `number`                        | Visible text rows.                 |
| `className`      | `string`                        | Styles the textarea element.       |
| `fieldClassName` | `string`                        | Styles the outer field wrapper.    |
| `required`       | `boolean`                       | Marks the field as required.       |
| `disabled`       | `boolean`                       | Disables the textarea.             |
| `showError`      | `boolean`                       | Controls error message visibility. |

Other supported properties depend on the underlying textarea primitive and the component's actual prop definition.

## 4. Basic Usage

```tsx
<FormTextarea name="notes" label="Notes" placeholder="Enter additional notes" />
```

The component automatically connects to the surrounding `Form` context.

## 5. Description and Validation

```tsx
<FormTextarea
  name="description"
  label="Description"
  description="Provide a short description of the service."
  placeholder="Enter service description"
/>
```

Example Zod schema:

```tsx
import * as z from "zod";

export const serviceSchema = z.object({
  description: z
    .string()
    .min(10, "Description must contain at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
});
```

Validation errors are displayed through the shared field implementation.

## 6. Custom Styling

Use `className` for textarea-specific styling and `fieldClassName` for the outer field wrapper.

```tsx
<FormTextarea
  name="notes"
  label="Notes"
  className="min-h-32 resize-y"
  fieldClassName="gap-3"
/>
```

| Prop             | Styles              |
| ---------------- | ------------------- |
| `className`      | Textarea element    |
| `fieldClassName` | Outer field wrapper |

## 7. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormTextarea,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  notes: z.string().max(500, "Notes cannot exceed 500 characters"),
});

type FormValues = z.infer<typeof schema>;

export function NotesForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      notes: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormTextarea
        name="notes"
        label="Notes"
        description="Add any additional information."
        placeholder="Enter notes..."
        className="min-h-32"
      />

      <FormSubmitButton>Save notes</FormSubmitButton>
    </Form>
  );
}
```

## 8. Best Practices

- Use `FormTextarea` for multiline string values.
- Keep validation rules in your Zod schema.
- Set a suitable minimum height for longer content.
- Use `maxLength` when the UI should enforce a character limit.
- Use `FormInput` for short, single-line values.
- Use `FormInputGroupTextarea` when the textarea needs input-group addons.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Input](./form-input.md)
- [Form Input Group Textarea](./form-input-group-textarea.md)
- [Validation](./validation.md)
