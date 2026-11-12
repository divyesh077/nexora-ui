# Form Input

The `FormInput` component connects a text input to React Hook Form.

It combines the shared `FormField` functionality with the Nexora UI `Input` primitive, providing consistent labels, descriptions, validation errors, and accessibility support.

## 1. Features

- React Hook Form integration.
- Type-safe field names.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom input styling.
- Custom outer field styling.
- Support for standard input attributes.

## 2. Import

```tsx
import { FormInput } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Props

The component extends the shared form field props and the underlying input props.

| Prop             | Type                            | Description                        |
| ---------------- | ------------------------------- | ---------------------------------- |
| `name`           | `StringFieldName<TFieldValues>` | Name of the string form field.     |
| `label`          | `ReactNode`                     | Field label.                       |
| `description`    | `ReactNode`                     | Supporting description.            |
| `placeholder`    | `string`                        | Input placeholder.                 |
| `type`           | `string`                        | HTML input type.                   |
| `className`      | `string`                        | Styles the input element.          |
| `fieldClassName` | `string`                        | Styles the outer field wrapper.    |
| `orientation`    | `FormOrientation`               | Field layout orientation.          |
| `required`       | `boolean`                       | Marks the field as required.       |
| `disabled`       | `boolean`                       | Disables the input.                |
| `showError`      | `boolean`                       | Controls error message visibility. |

Other supported native input properties depend on the component's actual prop definition.

## 4. Basic Usage

```tsx
<FormInput name="firstName" label="First name" placeholder="Enter first name" />
```

The component automatically connects the input to the surrounding `Form` context.

## 5. Input Types

Use the `type` prop to select an appropriate HTML input type.

```tsx
<FormInput
  name="email"
  label="Email address"
  type="email"
  placeholder="Enter email address"
/>
```

Other common examples:

```tsx
<FormInput
  name="username"
  label="Username"
  type="text"
/>

<FormInput
  name="website"
  label="Website"
  type="url"
/>
```

Use `FormNumberInput` for numeric form values instead of treating numbers as strings.

## 6. Description and Validation

```tsx
<FormInput
  name="email"
  label="Email address"
  description="We'll use this address for account communication."
  type="email"
  placeholder="name@example.com"
/>
```

When validation fails, the field displays its validation error according to the shared `FormField` implementation.

Example Zod schema:

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  email: z.email("Please enter a valid email address"),
});
```

## 7. Required and Disabled States

```tsx
<FormInput
  name="firstName"
  label="First name"
  required
/>

<FormInput
  name="employeeId"
  label="Employee ID"
  disabled
/>
```

The `required` and `disabled` props are passed through the shared field integration to the underlying input.

## 8. Custom Styling

`FormInput` provides separate class name properties for the input and its outer field wrapper.

```tsx
<FormInput
  name="firstName"
  label="First name"
  className="bg-muted"
  fieldClassName="gap-3"
/>
```

| Prop             | Styles              |
| ---------------- | ------------------- |
| `className`      | Input element       |
| `fieldClassName` | Outer field wrapper |

Use `className` for input-specific styling and `fieldClassName` for layout and spacing.

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormInput,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  email: z.email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function EmployeeForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormInput
        name="firstName"
        label="First name"
        placeholder="Enter first name"
        required
      />

      <FormInput
        name="email"
        label="Email address"
        type="email"
        placeholder="Enter email address"
        required
      />

      <FormSubmitButton>Save employee</FormSubmitButton>
    </Form>
  );
}
```

## 10. Best Practices

- Use `FormInput` for string-based form fields.
- Use the correct HTML input type.
- Keep validation rules in your Zod schema when using a resolver.
- Use `fieldClassName` for wrapper styling.
- Use `className` for input styling.
- Use `FormNumberInput` for numeric values.
- Use `FormInputGroup` when an input needs an addon or supporting content.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Number Input](./form-number-input.md)
- [Form Textarea](./form-textarea.md)
- [Form Input Group](./form-input-group.md)
- [Validation](./validation.md)
