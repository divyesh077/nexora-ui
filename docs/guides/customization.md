# Customization

Nexora UI components are designed to be reusable and customizable.

After installing a component through the Nexora registry, its source code becomes part of your application. You can customize its appearance and behavior according to your project requirements.

## 1. Customization Approaches

Nexora UI supports several customization approaches:

1. Component props.
2. Tailwind CSS class names.
3. Theme variables.
4. Component source code.
5. Composition with other UI primitives.

Choose the approach that best fits the customization requirement.

## 2. Customize Using Component Props

Use the available component props to configure behavior and appearance.

For example:

```tsx
<Button variant="outline" size="lg">
  Save changes
</Button>
```

For a form component:

```tsx
<FormInput
  name="firstName"
  label="First name"
  placeholder="Enter first name"
  required
  disabled={false}
/>
```

Prefer existing props before modifying the component source.

## 3. Customize Using Tailwind Classes

Nexora components expose class name properties for styling different component elements.

For example:

```tsx
<FormInputGroup
  name="price"
  label="Price"
  startAddon="$"
  fieldClassName="gap-3"
  inputGroupClassName="rounded-lg"
  inputClassName="text-right"
/>
```

Different class properties target different parts of the component.

| Property              | Purpose                     |
| --------------------- | --------------------------- |
| `className`           | Main component element      |
| `fieldClassName`      | Outer field wrapper         |
| `inputClassName`      | Input element               |
| `inputGroupClassName` | Input group container       |
| `contentClassName`    | Dropdown or popover content |

Only use properties supported by the specific component.

See [Tailwind CSS Class Autocomplete](./tailwind-class-autocomplete.md) for editor configuration.

## 4. Customize Theme Variables

Use CSS variables to apply consistent visual changes across multiple components.

For example:

```css
:root {
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
  --radius: 0.75rem;
}
```

Theme variables allow you to customize shared design tokens without changing individual component implementations.

See [Theming](./theming.md) for more information.

## 5. Customize Installed Component Source

Registry-installed components are available in your application's source code.

For example:

```text
src/
└── components/
    └── nexora-ui/
        └── forms/
            ├── core/
            ├── fields/
            ├── actions/
            └── index.ts
```

You can modify installed source files when you need behavior that is not exposed through the public component props.

Examples:

- Add a new component prop.
- Change default styling.
- Customize component composition.
- Add application-specific behavior.
- Extend validation or accessibility behavior.

Changes to installed files belong to your application. They do not automatically modify the original Nexora UI repository.

## 6. Extend Components

You can create application-specific wrappers around Nexora components.

For example:

```tsx
import { FormInput } from "@/components/nexora-ui/forms";

type EmployeeNameFieldProps = {
  name: "firstName" | "lastName";
  label: string;
};

export function EmployeeNameField({ name, label }: EmployeeNameFieldProps) {
  return (
    <FormInput
      name={name}
      label={label}
      placeholder={`Enter ${label.toLowerCase()}`}
      fieldClassName="gap-2"
    />
  );
}
```

This allows you to reuse consistent configurations without changing the original component.

## 7. Compose Components

Nexora UI components can be combined with other primitives to build more complex interfaces.

For example:

```tsx
<FieldSet>
  <FieldLegend>Employee Information</FieldLegend>

  <FieldGroup>
    <FormInput name="firstName" label="First name" />

    <FormInput name="email" label="Email address" type="email" />
  </FieldGroup>
</FieldSet>
```

Composition is useful when building larger forms and reusable application layouts.

## 8. Update Installed Components

When the Nexora registry component is updated, you can review the updated component before applying it to your application.

Because registry-installed components are local source files, custom modifications should be reviewed carefully before replacing them.

Recommended process:

1. Check the latest component implementation.
2. Review changes against your local implementation.
3. Identify any custom modifications.
4. Merge the required changes.
5. Run TypeScript checks and tests.
6. Verify the component in your application.

Do not assume that updating a registry component will preserve all local modifications.

## 9. Best Practices

- Prefer public component props for ordinary customization.
- Use Tailwind classes for local visual adjustments.
- Use theme variables for global design changes.
- Create wrappers for repeated application-specific configurations.
- Modify installed source only when necessary.
- Keep accessibility and keyboard behavior intact.
- Test customized components in light and dark themes.
- Review upstream changes before updating modified components.

## Related Guides

- [Theming](./theming.md)
- [Tailwind CSS Class Autocomplete](./tailwind-class-autocomplete.md)
