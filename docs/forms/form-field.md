# Form Field

The `FormField` component connects an individual form control to React Hook Form.

It manages field registration, validation state, labels, descriptions, accessibility attributes, and error messages.

Instead of repeating `Controller` and field layout logic for every input component, `FormField` provides a shared implementation.

## 1. Features

- Integrates with React Hook Form's `Controller`.
- Supports type-safe field names.
- Supports custom field rendering through render props.
- Displays labels and descriptions.
- Displays validation errors.
- Supports required and disabled states.
- Supports vertical, horizontal, and responsive orientations.
- Provides generated accessibility IDs.
- Supports custom styling through `className`.

## 2. Import

```tsx
import { FormField } from "@/components/nexora-ui/forms";
```

## 3. Props

| Prop               | Type                      | Required | Description                                            |
| ------------------ | ------------------------- | -------- | ------------------------------------------------------ |
| `name`             | `FieldPath<TFieldValues>` | Yes      | Name of the form field.                                |
| `render`           | Render function           | Yes      | Renders the actual form control.                       |
| `label`            | `ReactNode`               | No       | Field label.                                           |
| `description`      | `ReactNode`               | No       | Supporting description.                                |
| `className`        | `string`                  | No       | Outer field styling.                                   |
| `orientation`      | `FormOrientation`         | No       | Field layout orientation.                              |
| `labelPlacement`   | `"start" \| "end"`        | No       | Label placement.                                       |
| `showError`        | `boolean`                 | No       | Controls error message visibility.                     |
| `required`         | `boolean`                 | No       | Marks the field as required.                           |
| `disabled`         | `boolean`                 | No       | Disables the field.                                    |
| `rules`            | `Controller` rules        | No       | React Hook Form validation rules.                      |
| `shouldUnregister` | `boolean`                 | No       | Controls whether the field unregisters when unmounted. |
| `defaultValue`     | Field value               | No       | Default value for the field.                           |

The component also supports the render properties provided by React Hook Form's `Controller`.

## 4. Basic Usage

Use `FormField` when you need custom rendering that is not covered by an existing Nexora field component.

```tsx
<FormField
  name="firstName"
  label="First name"
  description="Enter the employee's first name."
  render={({ field, ids, invalid, required, disabled, ariaDescribedBy }) => (
    <Input
      {...field}
      id={ids.control}
      value={field.value ?? ""}
      aria-invalid={invalid}
      aria-describedby={ariaDescribedBy}
      required={required}
      disabled={disabled}
    />
  )}
/>
```

The example assumes that `Input` is your installed Nexora UI input primitive.

## 5. Understanding Render Props

The `render` callback receives the following properties:

| Property          | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `field`           | React Hook Form field properties such as `value`, `onChange`, `onBlur`, `name`, and `ref`. |
| `fieldState`      | Current field validation state.                                                            |
| `formState`       | Current form state.                                                                        |
| `ids`             | Generated IDs for the control, description, and error.                                     |
| `invalid`         | Whether the field currently has a validation error.                                        |
| `required`        | Whether the field is required.                                                             |
| `disabled`        | Whether the field is disabled.                                                             |
| `ariaDescribedBy` | IDs of the associated description and visible error elements.                              |

Use these properties to connect your control to React Hook Form and maintain accessible relationships.

## 6. Field Orientation

`FormField` supports different layout orientations through its `orientation` prop.

```tsx
<FormField
  name="email"
  label="Email address"
  orientation="vertical"
  render={({ field }) => <Input {...field} value={field.value ?? ""} />}
/>
```

Available orientations:

- `vertical`
- `horizontal`
- `responsive`

The exact layout behavior is provided by the underlying Nexora `Field` primitive.

## 7. Required and Disabled States

You can configure required and disabled states directly.

```tsx
<FormField
  name="email"
  label="Email address"
  required
  render={({ field, ids, invalid, required, disabled }) => (
    <Input
      {...field}
      id={ids.control}
      value={field.value ?? ""}
      required={required}
      disabled={disabled}
      aria-invalid={invalid}
    />
  )}
/>
```

The render callback receives the resolved state so the control can apply it consistently.

## 8. Custom Validation Rules

You can provide React Hook Form validation rules through `rules`.

```tsx
<FormField
  name="username"
  label="Username"
  rules={{
    minLength: {
      value: 3,
      message: "Username must contain at least 3 characters.",
    },
  }}
  render={({ field, ids, invalid }) => (
    <Input
      {...field}
      id={ids.control}
      value={field.value ?? ""}
      aria-invalid={invalid}
    />
  )}
/>
```

When using a resolver such as Zod, keep your primary validation rules in the schema to avoid maintaining conflicting validation logic in multiple places.

## 9. When to Use FormField

Use `FormField` when:

- Building a custom form control.
- Integrating a third-party input.
- Creating a field that does not have a dedicated Nexora wrapper.
- Requiring custom control rendering.

For standard controls, prefer the ready-made components such as `FormInput`, `FormSelect`, or `FormCheckbox`.

## 10. Best Practices

- Always connect `field.value`, `field.onChange`, and `field.onBlur` appropriately.
- Forward the field ref when the underlying control supports it.
- Connect the control ID to its label.
- Apply `aria-invalid` when the field is invalid.
- Associate descriptions and errors using `aria-describedby`.
- Avoid duplicating the same field layout and validation logic in custom controls.

## Related Components

- [Form](./form.md)
- [Form Input](./form-input.md)
- [Form Select](./form-select.md)
- [Form Checkbox](./form-checkbox.md)
- [Validation](./validation.md)
