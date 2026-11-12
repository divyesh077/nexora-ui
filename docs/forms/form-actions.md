# Form Actions

Nexora UI Forms provides reusable action buttons for common form operations.

These components help maintain consistent behavior and styling for submitting, resetting, and cancelling forms.

## 1. Available Components

| Component          | Purpose                                |
| ------------------ | -------------------------------------- |
| `FormSubmitButton` | Submits the form.                      |
| `FormResetButton`  | Resets the form to its default values. |
| `FormCancelButton` | Handles a cancellation action.         |

## 2. Import

```tsx
import {
  FormSubmitButton,
  FormResetButton,
  FormCancelButton,
} from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. FormSubmitButton

`FormSubmitButton` provides a reusable submit button connected to React Hook Form.

### Features

- Submits the surrounding form.
- Reads the form submission state.
- Supports a loading state.
- Supports custom loading text.
- Uses the underlying Nexora UI Button.

### Basic Usage

```tsx
<FormSubmitButton>Save employee</FormSubmitButton>
```

### Loading Text

```tsx
<FormSubmitButton loadingText="Saving employee...">
  Save employee
</FormSubmitButton>
```

The button can display a loading state while React Hook Form is submitting the form.

## 4. FormResetButton

`FormResetButton` resets the form using React Hook Form's `reset()` method.

### Basic Usage

```tsx
<FormResetButton>Reset form</FormResetButton>
```

By default, the form returns to its configured default values.

### Custom Click Handler

You can provide an additional click handler.

```tsx
<FormResetButton
  onClick={() => {
    console.log("Form reset requested");
  }}
>
  Reset
</FormResetButton>
```

The reset behavior can be prevented by calling `event.preventDefault()` in the click handler, if supported by the component's implementation.

## 5. FormCancelButton

`FormCancelButton` provides a reusable cancellation button.

Unlike the reset button, it does not automatically reset the form. The consumer provides the cancellation behavior.

### Basic Usage

```tsx
<FormCancelButton onClick={() => router.back()}>Cancel</FormCancelButton>
```

For a dialog-based form, you might close the dialog:

```tsx
<FormCancelButton onClick={() => setOpen(false)}>Cancel</FormCancelButton>
```

The cancellation action depends on the application.

## 6. Complete Example

```tsx
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormInput,
  FormSubmitButton,
  FormResetButton,
  FormCancelButton,
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
      <FormInput name="firstName" label="First name" />

      <FormInput name="email" label="Email" type="email" />

      <div className="flex justify-end gap-2">
        <FormCancelButton onClick={() => window.history.back()}>
          Cancel
        </FormCancelButton>

        <FormResetButton>Reset</FormResetButton>

        <FormSubmitButton loadingText="Saving...">
          Save employee
        </FormSubmitButton>
      </div>
    </Form>
  );
}
```

## 7. Recommended Usage

| Scenario                  | Component          |
| ------------------------- | ------------------ |
| Save a form               | `FormSubmitButton` |
| Restore default values    | `FormResetButton`  |
| Close a dialog            | `FormCancelButton` |
| Navigate away from a form | `FormCancelButton` |

## 8. Best Practices

- Use `FormSubmitButton` for form submission.
- Use `FormResetButton` when users need to restore default values.
- Use `FormCancelButton` for application-specific cancellation behavior.
- Avoid using a reset button when the intended action is navigation.
- Keep asynchronous API operations in the form submission handler.
- Use meaningful loading text for long-running submissions.

## Related Components

- [Form](./form.md)
- [Form Field](./form-field.md)
- [Form Input](./form-input.md)
- [Validation](./validation.md)
- [Examples](./examples.md)
