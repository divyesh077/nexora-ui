# Tailwind CSS Class Autocomplete

Nexora UI uses Tailwind CSS for styling its components.

Some Nexora components expose custom class name properties such as `fieldClassName`, `inputGroupClassName`, and `inputClassName`.

By default, the Tailwind CSS IntelliSense extension may not recognize every custom property. This guide explains how to configure Visual Studio Code to provide Tailwind class suggestions for these properties.

## 1. Prerequisites

Install the following Visual Studio Code extension:

**Tailwind CSS IntelliSense**

Extension ID:

```text
bradlc.vscode-tailwindcss
```

The extension provides:

- Tailwind CSS class suggestions.
- Class name completion.
- CSS previews.
- Class validation.
- Hover information.

## 2. Configure VS Code

Create or update the following file in your project:

```text
.vscode/settings.json
```

Add the following configuration:

```json
{
  "editor.quickSuggestions": {
    "strings": "on"
  },
  "tailwindCSS.classAttributes": [
    "class",
    "className",
    "fieldClassName",
    "inputClassName",
    "inputGroupClassName",
    "labelClassName",
    "descriptionClassName",
    "errorClassName",
    "wrapperClassName",
    "containerClassName",
    "iconClassName",
    "buttonClassName",
    "prefixClassName",
    "suffixClassName",
    "helperTextClassName"
  ]
}
```

## 3. Supported Class Properties

The configuration includes common Nexora UI class name properties.

| Property               | Purpose                       |
| ---------------------- | ----------------------------- |
| `className`            | General component styling     |
| `fieldClassName`       | Outer form field styling      |
| `inputClassName`       | Input element styling         |
| `inputGroupClassName`  | Input group container styling |
| `labelClassName`       | Label styling                 |
| `descriptionClassName` | Description styling           |
| `errorClassName`       | Error message styling         |
| `wrapperClassName`     | Wrapper styling               |
| `containerClassName`   | Container styling             |
| `iconClassName`        | Icon styling                  |
| `buttonClassName`      | Button styling                |
| `prefixClassName`      | Prefix styling                |
| `suffixClassName`      | Suffix styling                |
| `helperTextClassName`  | Helper text styling           |

Only add properties that are actually used by your components.

## 4. Example

Consider a Nexora form component:

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

With the VS Code configuration, Tailwind CSS IntelliSense can suggest classes inside these custom properties.

## 5. Adding New Class Properties

Whenever you introduce a new class name property in a Nexora component, add its name to `tailwindCSS.classAttributes`.

For example, if a component introduces:

```tsx
contentClassName = "...";
triggerClassName = "...";
```

Add both properties to the configuration:

```json
{
  "tailwindCSS.classAttributes": [
    "class",
    "className",
    "contentClassName",
    "triggerClassName"
  ]
}
```

Preserve the other existing properties when updating the configuration.

## 6. Troubleshooting

### Suggestions are not appearing

Check that:

- Tailwind CSS IntelliSense is installed and enabled.
- The property name is included in `tailwindCSS.classAttributes`.
- The project has a valid Tailwind CSS configuration.
- VS Code has recognized the correct workspace.

### Suggestions work for `className` but not custom properties

Add the custom property names to `tailwindCSS.classAttributes`.

### Changes are not reflected

After updating the configuration:

1. Save `.vscode/settings.json`.
2. Open the VS Code Command Palette.
3. Run **Developer: Reload Window**.

## 7. Team Configuration

If the configuration is useful to all Nexora UI contributors, commit `.vscode/settings.json` to the repository.

This allows contributors opening the repository in VS Code to receive the same Tailwind class suggestions.

The configuration is editor-specific and does not affect the runtime behavior of Nexora UI components.

## Best Practices

- Keep custom class properties consistently named.
- Add new properties to the IntelliSense configuration when introducing
