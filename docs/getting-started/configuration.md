# Configuration

This guide explains how to configure Nexora UI in your React or Next.js application.

Nexora UI follows the shadcn registry approach, so components are installed directly into your application and use your existing project configuration.

## 1. Components Configuration

Nexora UI uses the `components.json` file to configure the shadcn CLI and registry.

Add the Nexora registry to your existing configuration:

```json
{
  "registries": {
    "@nexora": "https://divyesh077.github.io/nexora-ui/r/{name}.json"
  }
}
```

Keep your existing aliases, style, Tailwind, and other shadcn settings. Do not replace the entire configuration with this snippet.

### Registry Namespace

The `@nexora` namespace identifies components from the Nexora UI registry.

For example:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

## 2. Import Aliases

Nexora UI components use project aliases to import shared UI components and utilities.

Your consumer application should have consistent TypeScript aliases.

Example `tsconfig.json` configuration:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

For a project without a `src` directory, configure the alias according to your project structure.

Ensure that the aliases used in installed component files match the aliases configured in your application.

## 3. Tailwind CSS Configuration

Nexora UI uses Tailwind CSS utility classes for component styling.

Make sure Tailwind CSS is configured in your application and that its source detection includes your application components.

For Tailwind CSS v4, use the appropriate CSS-first configuration and source detection for your project.

## 4. VS Code Tailwind CSS IntelliSense

Nexora UI uses custom class name properties such as:

- `fieldClassName`
- `inputClassName`
- `inputGroupClassName`
- `labelClassName`
- `descriptionClassName`
- `errorClassName`
- `wrapperClassName`
- `containerClassName`

Install the VS Code extension:

**Tailwind CSS IntelliSense**

Extension ID: `bradlc.vscode-tailwindcss`

Configure `.vscode/settings.json`:

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

This enables Tailwind CSS suggestions inside the configured custom class attributes.

For the complete guide, see [Tailwind CSS Class Autocomplete](../guides/tailwind-class-autocomplete.md).

## 5. Dependencies

Nexora UI registry items declare their required dependencies.

For example, the Forms collection uses integrations such as:

- React Hook Form
- Zod
- React Hook Form Zod Resolver
- date-fns
- Lucide React

The exact dependencies are determined by the component source files and registry definitions.

The shadcn CLI can install declared package dependencies and registry dependencies during component installation.

## 6. Local Registry Configuration

For local development, configure your consumer application's `components.json` to use the local Nexora UI server.

```json
{
  "registries": {
    "@nexora": "http://localhost:3001/r/{name}.json"
  }
}
```

Start the Nexora UI development server:

```bash
pnpm dev -- --port 3001
```

This configuration is intended for local development and testing.

Use the production registry URL when installing published components.

## 7. Styling Customization

Nexora UI components are installed as source code.

You can customize them directly in your application:

- Change Tailwind CSS classes.
- Extend component properties.
- Adjust layouts and spacing.
- Modify component behavior.
- Integrate application-specific logic.

Changes made in your application do not automatically modify the original Nexora UI registry.

## 8. Configuration Best Practices

- Keep registry URLs consistent across development and production environments.
- Use a consistent import alias throughout the application.
- Maintain Tailwind CSS configuration.
- Keep VS Code autocomplete settings synchronized with custom class name properties.
- Review installed component dependencies.
- Avoid overwriting customized components without reviewing changes.
- Keep consumer configuration separate from Nexora UI development configuration.

## Next Steps

Continue with:

- [Project Structure](./project-structure.md)
- [Installation](./installation.md)
- [Tailwind CSS Class Autocomplete](../guides/tailwind-class-autocomplete.md)
- [Forms Introduction](../forms/introduction.md)
