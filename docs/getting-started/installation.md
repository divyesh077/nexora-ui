# Installation

This guide explains how to install Nexora UI components into your React or Next.js application using the shadcn CLI.

Nexora UI uses a remote registry to distribute reusable component source code.

## Prerequisites

Before installing Nexora UI, make sure your project has:

- Node.js
- PNPM (recommended)
- React
- Tailwind CSS
- TypeScript
- shadcn/ui CLI

Your project should also have a valid `components.json` configuration.

## 1. Configure the Nexora Registry

Add the Nexora registry to your application's `components.json` file.

```json
{
  "registries": {
    "@nexora": "https://divyesh077.github.io/nexora-ui/r/{name}.json"
  }
}
```

The `@nexora` namespace is used to identify components distributed by Nexora UI.

## 2. Install Components

Use the shadcn CLI to install components from the Nexora registry.

### Install Nexora Button

```bash
pnpm dlx shadcn@latest add @nexora/nexora-button
```

### Install Nexora Forms

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

The CLI resolves the registry item, installs its required dependencies, and copies the component source files into your application.

## 3. Local Registry Development

During Nexora UI development, you can test components locally before publishing them.

### Step 1: Start the Nexora UI development server

Open a terminal in the Nexora UI repository:

```bash
pnpm dev -- --port 3001
```

The local registry will be available at:

```text
http://localhost:3001/r/{name}.json
```

For example:

```text
http://localhost:3001/r/nexora-forms.json
```

### Step 2: Configure the local registry

In your consumer application's `components.json`, configure:

```json
{
  "registries": {
    "@nexora": "http://localhost:3001/r/{name}.json"
  }
}
```

### Step 3: Install a local component

Run this command from the consumer application's root directory:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

The CLI retrieves the component definition from your local Nexora UI development server.

### Step 4: Verify installation

Check that:

- The registry JSON loads successfully.
- The component files are generated.
- Required dependencies are installed.
- Imports resolve correctly.
- Components render in your consumer application.

## 4. Production Registry Installation

Once components are built and published, use the production registry URL.

Configure your consumer application's `components.json`:

```json
{
  "registries": {
    "@nexora": "https://divyesh077.github.io/nexora-ui/r/{name}.json"
  }
}
```

Install components using:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

## 5. Installing Additional Components

You can install additional registry items individually.

For example:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-button
```

The available installation commands depend on the items published in the Nexora registry.

## 6. Updating Installed Components

When a component is updated in Nexora UI:

1. Update its source code in the Nexora UI repository.
2. Update the registry definition if necessary.
3. Build the registry.
4. Publish the updated registry JSON.
5. Re-run the installation command in the consumer application.

The shadcn CLI may prompt you to overwrite existing files.

Review the changes before accepting an overwrite, because installed components are source code owned by the consumer application.

## 7. Troubleshooting

### Registry URL is not accessible

Verify that the Nexora UI development server is running or that the production registry has been published.

### Component not found

Check that:

- The component exists in `registry.json`.
- The registry item name is correct.
- The generated JSON exists in the registry hosting location.
- The registry URL uses the correct `{name}` placeholder.

### Missing dependencies

Check the registry item's `dependencies` and `registryDependencies` definitions.

### Import errors after installation

Verify that:

- Registry targets match your intended file structure.
- Required shadcn components are installed.
- Import aliases match your consumer application's configuration.
- External dependencies are available.

## Important Notes

- Nexora UI distributes component source code through the shadcn registry.
- Installed components can be customized directly in the consumer application.
- Local registry URLs are intended for development and testing.
- Use the production registry URL for published components.
- Only install registry items that have been published.

## Next Steps

Continue with:

- [Configuration](./configuration.md)
- [Project Structure](./project-structure.md)
- [Forms Introduction](../forms/introduction.md)
