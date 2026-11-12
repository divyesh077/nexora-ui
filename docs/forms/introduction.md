# Forms

Nexora UI Forms provides reusable, accessible, and type-safe form components built on top of React Hook Form, Zod, and Nexora UI primitives.

The goal is to reduce repetitive form implementation while maintaining consistent validation, accessibility, styling, and developer experience across applications.

## 1. Features

- Reusable form components.
- React Hook Form integration.
- Zod schema validation.
- TypeScript support.
- Accessible form controls.
- Consistent labels, descriptions, and error messages.
- Support for controlled and uncontrolled form values through React Hook Form.
- Customizable component styling.
- Reusable form actions.

## 2. Technology Stack

| Technology            | Purpose                               |
| --------------------- | ------------------------------------- |
| React                 | Component rendering                   |
| TypeScript            | Type safety                           |
| React Hook Form       | Form state and validation integration |
| Zod                   | Schema validation                     |
| `@hookform/resolvers` | Connects Zod with React Hook Form     |
| Base UI               | Accessible UI primitives              |
| Tailwind CSS          | Component styling                     |

## 3. Architecture

The Forms library is organized into three main areas.

### Core

Core components provide the foundation for form state management and field rendering.

Examples:

- `Form`
- `FormField`
- `FormFieldSet`

### Fields

Field components connect individual UI controls to React Hook Form.

Available field components include:

- `FormInput`
- `FormNumberInput`
- `FormTextarea`
- `FormSelect`
- `FormCheckbox`
- `FormCheckboxGroup`
- `FormRadioGroup`
- `FormSwitch`
- `FormDatePicker`
- `FormInputGroup`
- `FormInputGroupTextarea`

### Actions

Action components provide reusable form buttons.

- `FormSubmitButton`
- `FormResetButton`
- `FormCancelButton`

Refer to the individual component documentation for their actual props and usage.

## 4. How It Works

Nexora UI Forms uses React Hook Form to manage form state and Zod to validate submitted values.

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
       Form Component
            |
            v
       FormField
            |
            v
    Nexora Form Controls
            |
            v
     Submit Handler
```

Each field component receives its field name and connects to the form context. This avoids repeating `Controller`, label, description, and error-rendering logic in every form.

## 5. Form Validation

Define a Zod schema to describe the expected form values.

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Enter a valid email address"),
  isActive: z.boolean(),
});

export type EmployeeFormInput = z.input<typeof employeeSchema>;
export type EmployeeFormValues = z.output<typeof employeeSchema>;
```

Use `zodResolver` to connect the schema to React Hook Form.

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const methods = useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
  resolver: zodResolver(employeeSchema),
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    isActive: true,
  },
});
```

Using separate input and output types is useful when a schema transforms values during validation.

## 6. Design Principles

### Consistency

All form controls should follow consistent conventions for labels, descriptions, errors, and styling.

### Reusability

Common React Hook Form integration logic should live in shared form components rather than being repeated in every field.

### Accessibility

Form controls should provide appropriate labels, descriptions, invalid states, and error associations.

### Type Safety

Field names should be constrained using React Hook Form's `FieldPath` types wherever possible.

### Customization

Components should expose styling props for their relevant UI elements without requiring users to modify the library source.

## 7. Recommended Usage

Use Nexora UI Forms when building forms that need consistent validation, accessibility, and reusable controls.

For very simple controls that do not need form state management, use the underlying Nexora UI primitives directly.

## Next Steps

- [Forms Installation](./installation.md)
- [Form Component](./form.md)
- [Form Field](./form-field.md)
- [Validation](./validation.md)
- [Examples](./examples.md)
