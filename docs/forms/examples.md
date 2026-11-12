# Forms Examples

This guide demonstrates how to combine Nexora UI Forms components to build practical, validated forms.

The examples use React Hook Form, Zod, and the Nexora UI Forms library.

## 1. Employee Form

This example combines the available form controls to create an employee registration form.

### Features

- Personal information.
- Contact information.
- Employment details.
- Numeric fields.
- Date selection.
- Checkbox and radio groups.
- Switch controls.
- Input-group components.
- Zod validation.
- Form submission and reset actions.

### Step 1: Define the Schema

Create `employee.schema.ts`.

```tsx
import * as z from "zod";

export const employeeFormSchema = z.object({
  // Personal information
  firstName: z
    .string()
    .trim()
    .min(2, "First name must contain at least 2 characters")
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must contain at least 2 characters")
    .max(50),

  email: z.email("Enter a valid email address"),

  phone: z.string().regex(/^\d{10,15}$/, "Enter a valid phone number"),

  age: z.number().int().min(18).max(65).nullable(),

  // Address
  address: z.string().trim().min(5, "Address is required").max(250),

  city: z.string().trim().min(1, "City is required"),

  notes: z.string().max(500, "Notes cannot exceed 500 characters"),

  // Employment
  employmentType: z.enum(["full-time", "part-time", "contract"]),

  joiningDate: z
    .date()
    .nullable()
    .refine((value) => value !== null, "Joining date is required"),

  salary: z
    .number()
    .min(0, "Salary cannot be negative")
    .nullable()
    .refine((value) => value !== null, "Salary is required"),

  website: z
    .string()
    .refine(
      (value) => value === "" || z.url().safeParse(value).success,
      "Enter a valid website URL",
    ),

  // Assigned services
  services: z
    .array(z.enum(["haircut", "hair-color", "facial"]))
    .min(1, "Select at least one service"),

  // Settings
  isActive: z.boolean(),

  termsAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

export type EmployeeFormInput = z.input<typeof employeeFormSchema>;

export type EmployeeFormValues = z.output<typeof employeeFormSchema>;
```

### Step 2: Create the Form Component

Create `employee-form.tsx`.

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormInput,
  FormNumberInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormCheckboxGroup,
  FormRadioGroup,
  FormSwitch,
  FormDatePicker,
  FormInputGroup,
  FormInputGroupTextarea,
  FormSubmitButton,
  FormResetButton,
  FormCancelButton,
} from "@/components/nexora-ui/forms";

import {
  employeeFormSchema,
  EmployeeFormInput,
  EmployeeFormValues,
} from "./employee.schema";

import {
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";

const employmentOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

const serviceOptions = [
  {
    value: "haircut",
    label: "Haircut",
    description: "Hair styling and cutting.",
  },
  {
    value: "hair-color",
    label: "Hair coloring",
    description: "Hair coloring services.",
  },
  {
    value: "facial",
    label: "Facial",
    description: "Facial and skincare treatments.",
  },
];

const defaultValues: EmployeeFormInput = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: null,
  address: "",
  city: "",
  notes: "",
  employmentType: "full-time",
  joiningDate: null,
  salary: null,
  website: "",
  services: [],
  isActive: true,
  termsAccepted: false,
};

export function EmployeeForm() {
  const methods = useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const handleSubmit = async (values: EmployeeFormValues) => {
    console.log("Employee data:", values);

    // Replace with your API or server action.
  };

  const handleCancel = () => {
    // Replace with your navigation or dialog-close logic.
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <FieldSet>
        <FieldLegend>Personal Information</FieldLegend>
        <FieldDescription>
          Enter the employee's personal and contact details.
        </FieldDescription>

        <FieldGroup>
          <FormInput
            name="firstName"
            label="First name"
            placeholder="Enter first name"
            required
          />

          <FormInput
            name="lastName"
            label="Last name"
            placeholder="Enter last name"
            required
          />

          <FormInput
            name="email"
            label="Email address"
            type="email"
            placeholder="name@example.com"
            required
          />

          <FormInput
            name="phone"
            label="Phone number"
            type="tel"
            placeholder="Enter phone number"
            required
          />

          <FormNumberInput
            name="age"
            label="Age"
            placeholder="Enter age"
            min={18}
            max={65}
          />
        </FieldGroup>
      </FieldSet>

      {/* Address */}
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>

        <FieldGroup>
          <FormInputGroupTextarea
            name="address"
            label="Address"
            placeholder="Enter complete address"
            startAddon="Address"
          />

          <FormInput name="city" label="City" placeholder="Enter city" />

          <FormTextarea
            name="notes"
            label="Additional notes"
            placeholder="Enter additional information"
          />
        </FieldGroup>
      </FieldSet>

      {/* Employment */}
      <FieldSet>
        <FieldLegend>Employment Details</FieldLegend>

        <FieldGroup>
          <FormSelect
            name="employmentType"
            label="Employment type"
            placeholder="Select employment type"
            options={employmentOptions}
          />

          <FormDatePicker
            name="joiningDate"
            label="Joining date"
            placeholder="Select joining date"
            required
          />

          <FormNumberInput
            name="salary"
            label="Monthly salary"
            placeholder="Enter salary"
            min={0}
          />

          <FormInputGroup
            name="website"
            label="Website"
            placeholder="example.com"
            startAddon="https://"
          />
        </FieldGroup>
      </FieldSet>

      {/* Services */}
      <FieldSet>
        <FieldLegend>Assigned Services</FieldLegend>
        <FieldDescription>
          Select the services this employee can perform.
        </FieldDescription>

        <FormCheckboxGroup name="services" options={serviceOptions} required />
      </FieldSet>

      {/* Settings */}
      <FieldSet>
        <FieldLegend>Account Settings</FieldLegend>

        <FieldGroup>
          <FormSwitch
            name="isActive"
            label="Active employee"
            description="Enable or disable this employee."
          />

          <FormCheckbox
            name="termsAccepted"
            label="I confirm that the employee information is correct."
            required
          />
        </FieldGroup>
      </FieldSet>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-2">
        <FormCancelButton onClick={handleCancel}>Cancel</FormCancelButton>

        <FormResetButton>Reset</FormResetButton>

        <FormSubmitButton loadingText="Saving employee...">
          Save employee
        </FormSubmitButton>
      </div>
    </Form>
  );
}
```

**Note:** The example assumes the listed exports and props are available in your current library. Adjust the import paths and component APIs to match the actual implementation. In particular, ensure the URL validation matches the Zod version installed in your project.

## 2. Other Common Form Patterns

### Simple Contact Form

Use `FormInput` and `FormTextarea` for basic contact forms.

```tsx
<FormInput
  name="name"
  label="Name"
  placeholder="Enter your name"
/>

<FormInput
  name="email"
  label="Email"
  type="email"
/>

<FormTextarea
  name="message"
  label="Message"
  placeholder="Enter your message"
/>
```

### Settings Form

Use `FormSwitch` and `FormCheckbox` for boolean settings.

```tsx
<FormSwitch
  name="notifications"
  label="Enable notifications"
/>

<FormCheckbox
  name="termsAccepted"
  label="Accept terms and conditions"
/>
```

### Service Assignment Form

Use `FormCheckboxGroup` when multiple services can be selected.

```tsx
<FormCheckboxGroup
  name="services"
  label="Available services"
  options={serviceOptions}
/>
```

### Employment Type Form

Use `FormRadioGroup` when the user must choose exactly one option.

```tsx
<FormRadioGroup
  name="employmentType"
  label="Employment type"
  options={employmentOptions}
/>
```

## 3. Choosing the Right Component

| Requirement                        | Component                |
| ---------------------------------- | ------------------------ |
| Single-line text                   | `FormInput`              |
| Numeric value                      | `FormNumberInput`        |
| Multiline text                     | `FormTextarea`           |
| Input with prefix or suffix        | `FormInputGroup`         |
| Textarea with addons               | `FormInputGroupTextarea` |
| Single selection from a list       | `FormSelect`             |
| Independent boolean                | `FormCheckbox`           |
| Multiple selections                | `FormCheckboxGroup`      |
| Single choice from visible options | `FormRadioGroup`         |
| On/off setting                     | `FormSwitch`             |
| Calendar-based date selection      | `FormDatePicker`         |

## 4. Recommendations

- Keep validation schemas separate from form components.
- Use `z.input` and `z.output` when schemas transform values.
- Initialize every field with an appropriate default value.
- Use the dedicated Nexora form controls instead of repeating `Controller` logic.
- Keep API operations in application-level services or server actions.
- Test loading, invalid, disabled, and reset states.
- Verify accessibility and keyboard interactions.
- Validate important business rules on the server.

## Related Documentation

- [Forms Introduction](./introduction.md)
- [Forms Installation](./installation.md)
- [Form Component](./form.md)
- [Form Field](./form-field.md)
- [Validation](./validation.md)
