# Form

The `Form` component provides the foundation for building forms with Nexora UI.

It integrates React Hook Form's `FormProvider` with a native HTML `<form>` element, allowing nested form components to access form state through context.

## 1. Features

- Integrates with React Hook Form.
- Provides form methods through `FormProvider`.
- Supports validated submission.
- Supports invalid submission handling.
- Supports transformed Zod output types.
- Accepts standard HTML form attributes.
- Automatically disables native browser validation with `noValidate`.

## 2. Import

```tsx
import { Form } from "@/components/nexora-ui/forms";
```

Adjust the import path to match your installation target.

## 3. Props

| Prop        | Type                 | Required | Description                                    |
| ----------- | -------------------- | -------- | ---------------------------------------------- |
| `methods`   | `UseFormReturn`      | Yes      | React Hook Form methods returned by `useForm`. |
| `onSubmit`  | `SubmitHandler`      | Yes      | Called when the form passes validation.        |
| `onInvalid` | `SubmitErrorHandler` | No       | Called when validation fails.                  |
| `children`  | `ReactNode`          | Yes      | Form content.                                  |

The component also accepts standard HTML form attributes, except `onSubmit`, which is handled by the component.

## 4. Basic Usage

Create a form schema and initialize React Hook Form.

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
  firstName: z.string().min(2, "Enter at least 2 characters"),
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
    console.log("Submitted values:", values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormInput
        name="firstName"
        label="First name"
        placeholder="Enter first name"
      />

      <FormInput name="email" label="Email" placeholder="Enter email address" />

      <FormSubmitButton>Save employee</FormSubmitButton>
    </Form>
  );
}
```

## 5. Handling Invalid Submission

Use `onInvalid` to handle validation errors when the form cannot be submitted.

```tsx
<Form
  methods={methods}
  onSubmit={(values) => {
    console.log("Valid submission:", values);
  }}
  onInvalid={(errors) => {
    console.log("Validation errors:", errors);
  }}
>
  {/* Form fields */}
</Form>
```

The `onSubmit` callback runs when validation succeeds. The `onInvalid` callback runs when React Hook Form finds validation errors.

## 6. Transformed Form Values

Zod schemas can transform values before submission.

For example, a form might accept a string and transform it into a number.

```tsx
const schema = z.object({
  age: z.string().transform((value) => Number(value)),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;
```

Initialize React Hook Form with separate input and output types:

```tsx
const methods = useForm<FormInput, unknown, FormOutput>({
  resolver: zodResolver(schema),
  defaultValues: {
    age: "",
  },
});
```

The `Form` component supports the transformed output type:

```tsx
<Form<FormInput, unknown, FormOutput>
  methods={methods}
  onSubmit={(values) => {
    // values.age is a number
    console.log(values.age);
  }}
>
  {/* Form fields */}
</Form>
```

This distinction is useful when the values stored in form controls differ from the values expected by your API.

## 7. Additional HTML Attributes

Because `Form` accepts standard HTML form attributes, you can provide attributes such as:

```tsx
<Form
  methods={methods}
  onSubmit={handleSubmit}
  id="employee-form"
  className="space-y-6"
  autoComplete="off"
>
  {/* Form fields */}
</Form>
```

The component uses `noValidate` so validation is managed by React Hook Form and your configured resolver rather than the browser's native validation UI.

## 8. Best Practices

- Initialize `useForm` in the component that owns the form state.
- Define validation schemas separately from UI components.
- Use `defaultValues` to initialize form state.
- Keep API requests inside the submit handler or a dedicated application service.
- Use the input and output types when your schema transforms values.
- Avoid creating nested HTML forms.
- Use Nexora field components inside the `Form` provider.

## Related Components

- [Form Field](./form-field.md)
- [Form Input](./form-input.md)
- [Form Actions](./form-actions.md)
- [Validation](./validation.md)
- [Examples](./examples.md)
