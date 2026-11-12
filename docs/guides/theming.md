# Theming

Nexora UI uses Tailwind CSS and CSS variables to provide customizable component styling.

You can customize colors, borders, backgrounds, and other design tokens to match your application's visual identity without modifying every component individually.

## 1. Theme Architecture

Nexora UI follows a token-based styling approach.

```text
       CSS Variables
             |
             v
       Theme Tokens
             |
             v
        Tailwind CSS
             |
             v
      Nexora Components
             |
             v
      Application UI
```

Components use shared design tokens rather than hardcoding application-specific colors.

## 2. CSS Variables

Theme variables are typically defined in your application's global CSS file.

For example:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;

  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;

  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;

  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;

  --radius: 0.625rem;
}
```

These are illustrative HSL values using a common shadcn-style convention. Your actual theme may use a different color format or token structure.

## 3. Dark Mode

Define an alternative set of variables for dark mode.

For example:

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;

  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;

  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;

  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;

  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 212.7 26.8% 83.9%;
}
```

When the `.dark` class is applied to the appropriate ancestor element, components using these tokens can adapt to the dark theme.

## 4. Tailwind CSS Theme Tokens

Components can consume theme variables through Tailwind utility classes.

Examples:

```tsx
<div className="bg-background text-foreground">Application content</div>
```

```tsx
<Button className="bg-primary text-primary-foreground">Save</Button>
```

Common semantic tokens include:

| Token              | Purpose            |
| ------------------ | ------------------ |
| `background`       | Main background    |
| `foreground`       | Main text color    |
| `primary`          | Primary actions    |
| `secondary`        | Secondary surfaces |
| `muted`            | Subtle backgrounds |
| `muted-foreground` | Supporting text    |
| `border`           | Borders            |
| `input`            | Input borders      |
| `ring`             | Focus indicators   |

The exact Tailwind token configuration depends on your Tailwind CSS version and project setup.

## 5. Customizing the Primary Color

You can change the primary color by updating the corresponding theme variable.

For example:

```css
:root {
  --primary: 221 83% 53%;
  --primary-foreground: 0 0% 100%;
}
```

Components using the primary token will use the updated color without requiring individual component changes.

## 6. Customizing Border Radius

You can customize the shared radius token:

```css
:root {
  --radius: 0.75rem;
}
```

Use the radius token consistently to maintain a cohesive visual style.

## 7. Component-Level Customization

Nexora UI components can also be customized through their supported class name properties.

For example:

```tsx
<FormInput
  name="firstName"
  label="First name"
  fieldClassName="gap-3"
  className="rounded-lg"
/>
```

Use theme variables for global design changes and component class properties for local adjustments.

## 8. Light and Dark Theme Testing

When implementing or customizing a theme, verify:

- Text and background contrast.
- Input borders and focus indicators.
- Disabled component appearance.
- Validation error visibility.
- Popover and dropdown surfaces.
- Calendar selection and hover states.
- Button variants.
- Checkbox, radio, and switch states.

Test both light and dark themes rather than assuming every component will adapt automatically.

## 9. Best Practices

- Prefer semantic theme tokens over hardcoded colors.
- Keep light and dark theme variables synchronized.
- Maintain sufficient color contrast.
- Use shared tokens for consistent component styling.
- Avoid duplicating theme values across individual components.
- Test interactive and disabled states in both themes.
- Document any additional theme variables introduced by Nexora UI.

## Related Guides

- [Tailwind CSS Class Autocomplete](./tailwind-class-autocomplete.md)
- [Customization](./customization.md)
