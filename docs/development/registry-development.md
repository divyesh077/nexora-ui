# Registry Development

Nexora UI uses the shadcn registry system to distribute reusable components to consumer applications.

This guide explains how to define, build, test, and maintain registry components.

## 1. How the Registry Works

The registry contains component definitions and the files required to install them.

The workflow is:

1. Develop a component in the Nexora UI source code.
2. Register the component in `registry.json`.
3. Build the registry.
4. Generate registry JSON files.
5. Publish the generated files.
6. Install the component in a consumer application.

```text
Nexora UI Source
       |
       v
  registry.json
       |
       v
 Registry Build
       |
       v
 Generated JSON
       |
       v
  GitHub Pages
       |
       v
 Consumer Application
```

## 2. Registry Configuration

The root `registry.json` file defines the registry metadata and the components available for distribution.

Each registry item should describe:

- Its unique name.
- Its type.
- Its source files.
- Its dependencies.
- Its registry dependencies, when applicable.

For example, a simplified registry item:

```json
{
  "name": "nexora-button",
  "type": "registry:ui",
  "files": [
    {
      "path": "src/registry/default/button/button.tsx",
      "type": "registry:ui"
    }
  ]
}
```

This is an illustrative example. Keep paths, names, and types aligned with the actual project structure and registry configuration.

## 3. Adding a Component

Follow these steps when adding a new component.

### Step 1: Implement the Component

Create the component in the appropriate source directory.

For example:

```text
src/
└── registry/
    └── default/
        └── example-component/
            └── example-component.tsx
```

Follow the existing component conventions and reuse shared utilities where appropriate.

### Step 2: Add the Registry Item

Add an entry for the component to `registry.json`.

Ensure that:

- The registry name is unique.
- Every file path exists.
- The component type is correct.
- Required npm dependencies are declared.
- Internal registry dependencies are included when required.

### Step 3: Build the Registry

Run:

```bash
pnpm dlx shadcn@latest build
```

The build generates distributable registry JSON files under:

```text
public/
└── r/
    ├── nexora-button.json
    └── ...
```

The exact generated filenames depend on the registry item names.

## 4. Test the Generated Registry

Start the local development server:

```bash
pnpm dev -- --port 3001
```

Open the generated registry JSON in your browser:

```text
http://localhost:3001/r/nexora-button.json
```

Check that:

- The JSON loads successfully.
- The component name is correct.
- All expected files are included.
- Dependencies are declared correctly.
- Internal imports can resolve after installation.

## 5. Test Installation in a Consumer Application

Use a separate Next.js application to test the registry.

Configure the registry in the consumer application's `components.json`:

```json
{
  "registries": {
    "@nexora": "http://localhost:3001/r/{name}.json"
  }
}
```

Install the component:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-button
```

After installation:

1. Inspect the generated source files.
2. Install any required dependencies if prompted.
3. Run the consumer application.
4. Test the component's behavior.
5. Verify that styling and imports work correctly.

Testing in a consumer application is important because a component that works inside the Nexora UI repository may still have missing dependencies or incorrect imports when distributed.

## 6. Registry Dependencies

A registry component may depend on other registry components.

Declare those dependencies explicitly in the registry definition.

For example, a form component may depend on shared field or input components.

Before publishing, verify that all required dependencies are available and that installation works from a clean consumer project.

Do not rely on files that happen to exist in the Nexora UI repository but are not included or installed by the registry.

## 7. Publishing the Registry

Nexora UI uses GitHub Pages to host its generated registry files.

The published registry URL follows this pattern:

```text
https://divyesh077.github.io/nexora-ui/r/{name}.json
```

The publishing workflow is:

1. Build the registry.
2. Verify generated JSON files.
3. Commit the required source and generated registry changes according to the repository workflow.
4. Push the changes to the configured publishing branch.
5. Allow the GitHub Actions deployment to complete.
6. Test the public registry URL.

The exact deployment branch and generated-file commit policy should follow the repository's GitHub Actions configuration.

## 8. Updating an Existing Component

When updating an existing registry component:

1. Update its source implementation.
2. Update its registry definition if files, dependencies, or metadata change.
3. Rebuild the registry.
4. Inspect the generated JSON.
5. Test installation in a consumer application.
6. Update the component documentation.

Pay particular attention to breaking changes in public props and component behavior.

## 9. Common Problems

| Problem                                  | What to check                                   |
| ---------------------------------------- | ----------------------------------------------- |
| Registry URL returns 404                 | Check the item name and generated JSON filename |
| Registry JSON is invalid                 | Rebuild and inspect `registry.json`             |
| Component installation fails             | Check registry configuration and item name      |
| Missing imports                          | Include all required files and dependencies     |
| Missing npm packages                     | Declare required dependencies                   |
| Styling is missing                       | Check Tailwind configuration and theme tokens   |
| Works locally but not after installation | Test in a clean consumer application            |
| Public registry is outdated              | Check the GitHub Actions deployment status      |

## 10. Registry Development Checklist

- [ ] Component implementation is complete.
- [ ] Registry item is defined.
- [ ] All referenced file paths exist.
- [ ] Dependencies are declared.
- [ ] Registry build succeeds.
- [ ] Generated JSON is inspected.
- [ ] Local registry URL works.
- [ ] Consumer installation succeeds.
- [ ] Installed component works correctly.
- [ ] Documentation is updated.
- [ ] Public deployment is verified.
