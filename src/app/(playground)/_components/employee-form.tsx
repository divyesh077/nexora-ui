"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Globe, Phone } from "lucide-react";

import { sleep } from "@/lib/utils";

import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { InputGroupText } from "@/components/ui/input-group";

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
  FormActions,
  type CheckboxOption,
  type SelectOption,
  type RadioOption,
} from "@/registry/default/forms";

// -----------------------------------------------------------------------------
// Options
// -----------------------------------------------------------------------------

const employmentOptions: RadioOption[] = [
  {
    value: "full-time",
    label: "Full Time",
    description: "Regular full-time employment.",
  },
  {
    value: "part-time",
    label: "Part Time",
    description: "Flexible working hours.",
  },
  {
    value: "contract",
    label: "Contract",
    description: "Fixed-term employment.",
  },
];

const serviceOptions: CheckboxOption[] = [
  {
    value: "haircut",
    label: "Haircut",
    description: "Hair cutting and styling.",
  },
  {
    value: "hair-color",
    label: "Hair Color",
    description: "Hair coloring services.",
  },
  {
    value: "facial",
    label: "Facial",
    description: "Skin care and facial treatment.",
  },
  {
    value: "nail",
    label: "Nail Treatment",
    description: "Manicure and pedicure.",
  },
];

const cityOptions: SelectOption[] = [
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "surat", label: "Surat" },
  { value: "vadodara", label: "Vadodara" },
  { value: "rajkot", label: "Rajkot" },
];

// -----------------------------------------------------------------------------
// Validation Schema
// -----------------------------------------------------------------------------

export const employeeFormSchema = z.object({
  // Personal information
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Enter a valid phone number (10–15 digits)"),

  age: z
    .number()
    .int("Age must be a whole number")
    .min(18, "Employee must be at least 18 years old")
    .max(65, "Age cannot exceed 65")
    .nullable(),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(250, "Address cannot exceed 250 characters"),

  city: z.string().min(1, "Please select a city"),

  notes: z.string().max(500, "Notes cannot exceed 500 characters"),

  // Employment information
  employmentType: z.string().min(1, "Please select an employment type"),

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
      "Please enter a valid website URL",
    ),

  // Service permissions
  services: z.array(z.string()).min(1, "Select at least one service"),

  // Account settings
  isActive: z.boolean(),

  termsAccepted: z
    .boolean()
    .refine((value) => value, "You must accept the terms and conditions"),
});

// Input and validated output types
export type EmployeeFormInput = z.input<typeof employeeFormSchema>;
export type EmployeeFormValues = z.output<typeof employeeFormSchema>;

// -----------------------------------------------------------------------------
// Page Component
// -----------------------------------------------------------------------------

export default function EmployeeForm() {
  const router = useRouter();

  const methods = useForm<EmployeeFormInput, unknown, EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: null,
      address: "",
      city: "",
      notes: "",
      employmentType: "",
      joiningDate: null,
      salary: null,
      website: "",
      services: [],
      isActive: true,
      termsAccepted: false,
    },
  });

  // ---------------------------------------------------------------------------
  // Submit Handler
  // ---------------------------------------------------------------------------

  const handleSubmit = async (values: EmployeeFormValues) => {
    console.log("Validated employee form values:", values);

    // Simulate API request
    await sleep(1);

    console.log("Employee created successfully!");
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Forms Playground</h1>

        <p className="text-sm text-muted-foreground">
          Explore Nexora UI form components and their integration with React
          Hook Form and Zod.
        </p>
      </div>

      <Form methods={methods} onSubmit={handleSubmit} className="space-y-8">
        {/* ================================================================= */}
        {/* Personal Information */}
        {/* ================================================================= */}

        <FieldSet>
          <FieldLegend>Personal Information</FieldLegend>

          <FieldDescription>
            Enter the employee's basic information.
          </FieldDescription>

          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />

            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />

            <FormInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="employee@example.com"
              required
            />

            <FormNumberInput
              name="age"
              label="Age"
              placeholder="Enter age"
              min={18}
              max={65}
            />

            <FormInputGroup
              name="phone"
              label="Phone Number"
              placeholder="9876543210"
              startAddon={<Phone className="size-4" />}
              required
            />

            <FormSelect
              name="city"
              label="City"
              placeholder="Select city"
              options={cityOptions}
              required
            />

            {/* Textarea with Input Group */}
            <FormInputGroupTextarea
              name="address"
              label="Address"
              placeholder="Enter complete address"
              rows={3}
              fieldClassName="md:col-span-2"
              required
              endAddon={<InputGroupText>250 max</InputGroupText>}
            />

            {/* Standard Textarea */}
            <FormTextarea
              name="notes"
              label="Additional Notes"
              description="Any additional information about the employee."
              placeholder="Enter additional notes..."
              rows={4}
              fieldClassName="md:col-span-2"
            />
          </FieldGroup>
        </FieldSet>

        {/* ================================================================= */}
        {/* Employment Information */}
        {/* ================================================================= */}

        <FieldSet>
          <FieldLegend>Employment Information</FieldLegend>

          <FieldDescription>
            Configure the employee's employment details.
          </FieldDescription>

          <FormRadioGroup
            name="employmentType"
            legend="Employment Type"
            description="Select the employee's employment type."
            options={employmentOptions}
            required
          />

          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <FormDatePicker
              name="joiningDate"
              label="Joining Date"
              placeholder="Select joining date"
              required
            />

            <FormNumberInput
              name="salary"
              label="Monthly Salary"
              placeholder="Enter salary"
              min={0}
              required
            />

            <FormInputGroup
              name="website"
              label="Website"
              placeholder="https://yourwebsite.com"
              startAddon={<Globe className="size-4" />}
              fieldClassName="md:col-span-2"
            />
          </FieldGroup>
        </FieldSet>

        {/* ================================================================= */}
        {/* Service Information */}
        {/* ================================================================= */}

        <FieldSet>
          <FieldLegend>Service Permissions</FieldLegend>

          <FieldDescription>
            Choose the services this employee can provide.
          </FieldDescription>

          <FormCheckboxGroup
            name="services"
            legend="Available Services"
            description="Select one or more services."
            options={serviceOptions}
            required
          />
        </FieldSet>

        {/* ================================================================= */}
        {/* Account Settings */}
        {/* ================================================================= */}

        <FieldSet>
          <FieldLegend>Account Settings</FieldLegend>

          <FieldDescription>
            Configure account availability and consent.
          </FieldDescription>

          <FormSwitch
            name="isActive"
            label="Active Employee"
            description="Allow this employee to access the salon system."
          />

          <FormCheckbox
            name="termsAccepted"
            label="I confirm that the employee information is correct."
            required
          />
        </FieldSet>

        {/* ================================================================= */}
        {/* Form Actions */}
        {/* ================================================================= */}

        <FormActions>
          <FormCancelButton variant="outline" onClick={() => router.back()}>
            Cancel
          </FormCancelButton>

          <FormResetButton variant="outline">Reset</FormResetButton>

          <FormSubmitButton loadingText="Creating Employee...">
            Create Employee
          </FormSubmitButton>
        </FormActions>
      </Form>
    </div>
  );
}
