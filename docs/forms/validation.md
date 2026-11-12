# Form Validation

Nexora UI Forms uses React Hook Form for form state management and Zod for schema-based validation.

The `zodResolver` connects Zod schemas to React Hook Form, allowing form values to be validated before submission.

## 1. Validation Architecture

```text
       Zod Schema
            |
            v
      zodResolver
            |
            v
     React Hook Form
            |
            v
       FormField
            |
            v
     Validation State
            |
            v
    Form Error Message
```

Each field receives its validation state through React Hook Form. Nexora field components use that state to display errors.

## 2. Install Dependencies

```bash
pnpm add zod react-hook-form @hookform/resolvers
```

## 3. Define a Zod Schema

Create a separate schema file for your form.

```tsx
// employee.schema.ts

import * as z from "zod";

export const employeeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  email: z.email("Enter a valid email address"),

  age: z
    .number()
    .int("Age must be a whole number")
    .min(18, "Minimum age is 18")
    .max(65, "Maximum age is 65")
    .nullable(),

  isActive: z.boolean(),
});

export type EmployeeFormInput = z.input<typeof employeeSchema>;
export type EmployeeFormValues = z.output<typeof employeeSchema>;
```

Keep validation rules in the schema rather than repeating them across individual field components.

## 4. Connect Zod with React Hook Form

Use `zodResolver` when initializing the form.

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  employeeSchema,
  EmployeeFormInput,
  EmployeeFormValues,
} from "./employee.schema";

const methods = useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
  resolver: zodResolver(employeeSchema),
  defaultValues: {
    firstName: "",
    email: "",
    age: null,
    isActive: true,
  },
});
```

The three generic parameters represent:

| Generic              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `EmployeeFormInput`  | Values stored in the form before validation. |
| `unknown`            | Resolver context type.                       |
| `EmployeeFormValues` | Validated and transformed submission values. |

For schemas without transformations, input and output types are usually the same.

## 5. Input Types vs Output Types

Zod supports transforming values during validation.

For example, a form can accept a numeric value as a string and transform it into a number.

```tsx
const schema = z.object({
  age: z.string().transform((value) => Number(value)),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;
```

The types are different:

```tsx
// FormInput
{
  age: string;
}

// FormOutput
{
  age: number;
}
```

Use the input type for form state and the output type for validated submission.

## 6. Required Field Validation

Use `.min()`, `.email()`, `.refine()`, or other appropriate Zod validation methods.

```tsx
const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),

  email: z.email("Enter a valid email address"),
});
```

For a boolean field that must be true:

```tsx
const schema = z.object({
  termsAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});
```

## 7. Array Validation

Use array validation for checkbox groups.

```tsx
const schema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
});
```

You can also restrict allowed values:

```tsx
const schema = z.object({
  services: z
    .array(z.enum(["haircut", "facial", "hair-color"]))
    .min(1, "Select at least one service"),
});
```

## 8. Date Validation

For a nullable date field that must be selected:

```tsx
const schema = z.object({
  joiningDate: z
    .date()
    .nullable()
    .refine((value) => value !== null, "Joining date is required"),
});
```

For a date range:

```tsx
const schema = z.object({
  appointmentDate: z
    .date()
    .refine(
      (date) => date >= new Date(),
      "Appointment date cannot be in the past",
    ),
});
```

For production use, consider defining a consistent date boundary and timezone strategy rather than calculating different boundaries in multiple places.

## 9. Validation Modes

React Hook Form supports different validation modes.

```tsx
const methods = useForm({
  resolver: zodResolver(employeeSchema),
  mode: "onBlur",
});
```

Common modes:

| Mode        | Behavior                                    |
| ----------- | ------------------------------------------- |
| `onSubmit`  | Validates when the form is submitted.       |
| `onBlur`    | Validates when a field loses focus.         |
| `onChange`  | Validates whenever a field changes.         |
| `onTouched` | Validates after the field has been touched. |
| `all`       | Validates on blur and change.               |

Choose a mode based on the form's user experience requirements.

## 10. Displaying Validation Errors

Nexora field components integrate with React Hook Form and display validation errors through the shared field implementation.

Example:

```tsx
<FormInput name="firstName" label="First name" placeholder="Enter first name" />
```

When validation fails, the field can display its associated error message.

For a custom control, use the `FormField` render properties:

```tsx
<FormField
  name="firstName"
  label="First name"
  render={({ field, ids, invalid, ariaDescribedBy }) => (
    <Input
      {...field}
      id={ids.control}
      value={field.value ?? ""}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
    />
  )}
/>
```

## 11. Handling Invalid Submission

The `Form` component supports an `onInvalid` callback.

```tsx
<Form
  methods={methods}
  onSubmit={(values) => {
    console.log("Valid values:", values);
  }}
  onInvalid={(errors) => {
    console.log("Validation errors:", errors);
  }}
>
  {/* Form fields */}
</Form>
```

This callback is useful for logging errors or implementing application-specific error handling.

## 12. Best Practices

- Keep schemas separate from UI components.
- Use `z.input` and `z.output` when transformations are involved.
- Keep default values consistent with form input types.
- Use appropriate validation methods for each field type.
- Avoid duplicating validation logic in individual field components.
- Use `mode` deliberately to control the validation experience.
- Validate important business rules on the server as well; client-side validation is not a security boundary.
- Keep date and timezone handling consistent.

## Related Documentation

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Input](./form-input.md)
- [Form Number Input](./form-number-input.md)
- [Form Checkbox Group](./form-checkbox-group.md)
- [Form Date Picker](./form-date-picker.md)
- [Examples](./examples.md)
