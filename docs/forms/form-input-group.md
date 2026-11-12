# Form Input Group

The `FormInputGroup` component connects an input group to React Hook Form.

It extends a standard input with supporting content such as currency symbols, measurement units, URLs, email prefixes, and action buttons.

It combines the shared `FormField` functionality with the Nexora UI `InputGroup` primitives.

## 1. Features

- React Hook Form integration.
- Type-safe string field names.
- Start and end addons.
- Label and description support.
- Validation error display.
- Required and disabled states.
- Separate styling for the field, input group, input, and addons.
- Support for input-group content and buttons.

## 2. Import

```tsx
import { FormInputGroup } from "@/components/nexora-ui/forms";
```

Adjust the import path according to your registry installation target.

## 3. Props

The component combines shared form field props with input-group properties.

| Prop                  | Type                            | Description                         |
| --------------------- | ------------------------------- | ----------------------------------- |
| `name`                | `StringFieldName<TFieldValues>` | Name of the string form field.      |
| `label`               | `ReactNode`                     | Field label.                        |
| `description`         | `ReactNode`                     | Supporting description.             |
| `placeholder`         | `string`                        | Input placeholder.                  |
| `startAddon`          | `ReactNode`                     | Content displayed before the input. |
| `endAddon`            | `ReactNode`                     | Content displayed after the input.  |
| `fieldClassName`      | `string`                        | Styles the outer field wrapper.     |
| `inputGroupClassName` | `string`                        | Styles the input group container.   |
| `inputClassName`      | `string`                        | Styles the input element.           |
| `startAddonClassName` | `string`                        | Styles the start addon.             |
| `endAddonClassName`   | `string`                        | Styles the end addon.               |
| `required`            | `boolean`                       | Marks the field as required.        |
| `disabled`            | `boolean`                       | Disables the input.                 |
| `showError`           | `boolean`                       | Controls error message visibility.  |

Other supported input properties depend on the actual component prop definition.

## 4. Basic Usage

```tsx
<FormInputGroup
  name="website"
  label="Website"
  placeholder="example.com"
  startAddon="https://"
/>
```

The component automatically connects to the surrounding `Form` context.

## 5. Start Addon

Use `startAddon` to display supporting content before the input.

For example, a currency symbol:

```tsx
<FormInputGroup name="price" label="Price" placeholder="0.00" startAddon="$" />
```

You can also use icons or other React elements:

```tsx
<FormInputGroup
  name="email"
  label="Email address"
  placeholder="Enter email"
  startAddon={<MailIcon />}
/>
```

## 6. End Addon

Use `endAddon` to display supporting content after the input.

```tsx
<FormInputGroup
  name="duration"
  label="Duration"
  placeholder="30"
  endAddon="minutes"
/>
```

For a percentage:

```tsx
<FormInputGroup name="discount" label="Discount" placeholder="0" endAddon="%" />
```

## 7. Combining Addons

You can provide both start and end addons.

```tsx
<FormInputGroup
  name="price"
  label="Service price"
  placeholder="0.00"
  startAddon="$"
  endAddon="USD"
/>
```

## 8. Custom Styling

Each major element has a separate class name property.

```tsx
<FormInputGroup
  name="price"
  label="Price"
  startAddon="$"
  fieldClassName="gap-3"
  inputGroupClassName="rounded-lg"
  inputClassName="text-right"
  startAddonClassName="font-medium"
/>
```

| Prop                  | Styles                |
| --------------------- | --------------------- |
| `fieldClassName`      | Outer field wrapper   |
| `inputGroupClassName` | Input group container |
| `inputClassName`      | Input element         |
| `startAddonClassName` | Start addon           |
| `endAddonClassName`   | End addon             |

## 9. Validation Example

```tsx
import * as z from "zod";

export const serviceSchema = z.object({
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid price"),
});
```

The schema above treats the price as a string. Use a numeric field and numeric schema when your application needs to store the price as a number.

## 10. Best Practices

- Use addons for prefixes, suffixes, and supporting information.
- Keep input values separate from decorative addon content.
- Use `FormNumberInput` when the field should store a numeric value.
- Keep validation in your schema.
- Use the dedicated class name props to customize individual elements.
- Use `FormInputGroupTextarea` for multiline input-group content.

## Related Components

- [Form](./form.md)
- [Form Input](./form-input.md)
- [Form Number Input](./form-number-input.md)
- [Form Textarea](./form-textarea.md)
- [Form Input Group Textarea](./form-input-group-textarea.md)
