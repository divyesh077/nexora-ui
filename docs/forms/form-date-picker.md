# Form Date Picker

The `FormDatePicker` component connects a date picker to React Hook Form.

It combines the shared `FormField` functionality with the Nexora UI Popover and Calendar primitives.

Use it for selecting dates such as employee joining dates, appointment dates, birthdays, and service booking dates.

## 1. Features

- React Hook Form integration.
- Type-safe date field names.
- Date selection through a calendar.
- Popover-based calendar interface.
- Nullable date values.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Custom field styling.

## 2. Import

```tsx
import { FormDatePicker } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Value Type

The date field uses a `Date | null` value.

```tsx
type EmployeeFormValues = {
  joiningDate: Date | null;
};
```

Initialize the field with `null` when no date is selected.

```tsx
const methods = useForm<EmployeeFormValues>({
  defaultValues: {
    joiningDate: null,
  },
});
```

## 4. Props

The component combines shared form field props with its date-picker properties.

| Prop             | Type                          | Description                              |
| ---------------- | ----------------------------- | ---------------------------------------- |
| `name`           | `DateFieldName<TFieldValues>` | Name of the date form field.             |
| `label`          | `ReactNode`                   | Field label.                             |
| `description`    | `ReactNode`                   | Supporting description.                  |
| `placeholder`    | `string`                      | Text displayed when no date is selected. |
| `fieldClassName` | `string`                      | Styles the outer field wrapper.          |
| `required`       | `boolean`                     | Marks the field as required.             |
| `disabled`       | `boolean`                     | Disables date-picker interaction.        |
| `showError`      | `boolean`                     | Controls error message visibility.       |

Check the implementation for the complete public API and any additional calendar configuration props.

## 5. Basic Usage

```tsx
<FormDatePicker
  name="joiningDate"
  label="Joining date"
  placeholder="Select joining date"
/>
```

The component automatically connects to the surrounding `Form` context.

## 6. Description

Use `description` to explain which date the user should select.

```tsx
<FormDatePicker
  name="appointmentDate"
  label="Appointment date"
  description="Select the scheduled appointment date."
  placeholder="Choose a date"
/>
```

## 7. Required Date Validation

Use Zod to validate that a date has been selected.

```tsx
import * as z from "zod";

export const employeeSchema = z.object({
  joiningDate: z
    .date()
    .nullable()
    .refine((value) => value !== null, "Joining date is required"),
});
```

The schema accepts a nullable date as form input but rejects `null` during validation.

## 8. Date Validation Rules

You can also validate date ranges.

For example, prevent a joining date from being in the future:

```tsx
const employeeSchema = z.object({
  joiningDate: z
    .date()
    .nullable()
    .refine((value) => value !== null, "Joining date is required")
    .refine(
      (value) => value === null || value <= new Date(),
      "Joining date cannot be in the future",
    ),
});
```

For production applications, consider defining date boundaries separately so that the UI and validation schema use the same rules.

## 9. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormDatePicker,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";

const schema = z.object({
  joiningDate: z
    .date()
    .nullable()
    .refine((value) => value !== null, "Joining date is required"),
});

type FormValues = z.infer<typeof schema>;

export function EmployeeJoiningDateForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      joiningDate: null,
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit}>
      <FormDatePicker
        name="joiningDate"
        label="Joining date"
        description="Select the employee's joining date."
        placeholder="Choose a date"
        required
      />

      <FormSubmitButton>Save</FormSubmitButton>
    </Form>
  );
}
```

## 10. Date Handling Best Practices

- Use `Date | null` consistently for nullable date fields.
- Initialize empty date fields with `null`.
- Validate dates using Zod.
- Use a consistent date format when displaying or submitting dates.
- Consider timezone handling when converting dates to API values.
- Avoid treating date-only values as timestamps without defining the intended timezone behavior.

## 11. Best Practices

- Use `FormDatePicker` for calendar-based date selection.
- Provide a meaningful placeholder.
- Explain date requirements through descriptions.
- Keep UI date restrictions and schema validation consistent.
- Use a dedicated date formatting utility for display and API conversion.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Input](./form-input.md)
- [Validation](./validation.md)
