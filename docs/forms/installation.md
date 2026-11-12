# Forms Installation

This guide explains how to install Nexora UI Forms in your application and configure the required dependencies.

## 1. Prerequisites

Before installing Nexora Forms, make sure your application has:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui CLI configured
- A supported Nexora UI registry configuration

## 2. Configure the Nexora Registry

Add the Nexora registry namespace to your consumer application's `components.json`.

```json
{
  "registries": {
    "@nexora": "https://divyesh077.github.io/nexora-ui/r/{name}.json"
  }
}
```

If you already have a `registries` property, add the `@nexora` entry without removing your existing configuration.

## 3. Install Nexora Forms

Run the following command from your consumer application:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

The shadcn CLI downloads the registry item and installs its component files and declared dependencies.

Review the installation output to confirm that all required files were added successfully.

## 4. Install Required Dependencies

Nexora Forms uses React Hook Form and Zod for form management and validation.

If these packages are not already installed, run:

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

Install any additional dependencies reported by the registry CLI if they are not already present.

## 5. Verify Installation

Import the form components into a page or component.

```tsx
import {
  Form,
  FormInput,
  FormSubmitButton,
} from "@/components/nexora-ui/forms";
```

The import path depends on the installation target configured in the registry.

If your installed files use a different path, update the import accordingly.

## 6. Local Registry Development

When developing Nexora UI locally, you can test the registry before publishing it.

Start the Nexora UI development server:

```bash
pnpm dev -- --port 3001
```

Temporarily configure your consumer application's `components.json` to use the local registry:

```json
{
  "registries": {
    "@nexora": "http://localhost:3001/r/{name}.json"
  }
}
```

Install the Forms registry item:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

Make sure the Nexora UI development server is running while installing from the local registry.

After testing, restore the production registry URL.

## 7. Troubleshooting

### Registry item not found

Check that:

- The registry URL is correct.
- The registry item exists in `registry.json`.
- The registry JSON has been generated.
- The requested item name matches the registry definition.

### Cannot connect to the local registry

Check that:

- The Nexora UI development server is running.
- Port `3001` is available.
- The local registry URL is correct.

### Missing dependencies

Install any missing packages reported by the CLI using your package manager.

### Import path errors

Check the installation target paths in the registry definition and the aliases configured in your consumer application's `components.json`.

## Next Steps

- [Forms Introduction](./introduction.md)
- [Form Component](./form.md)
- [Form Field](./form-field.md)
- [Validation](./validation.md)
- [Examples](./examples.md)
