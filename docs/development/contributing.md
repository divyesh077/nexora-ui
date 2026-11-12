# Contributing to Nexora UI

Thank you for your interest in contributing to Nexora UI.

This guide explains the recommended workflow for contributing components, fixing bugs, improving documentation, and maintaining code quality.

## 1. Before You Start

Make sure you have the following installed:

- Node.js
- PNPM
- Git
- A code editor such as Visual Studio Code

You should also be familiar with:

- React and TypeScript
- Next.js
- Tailwind CSS
- shadcn/ui conventions
- Base UI primitives
- React Hook Form and Zod for form components

## 2. Get the Source Code

Clone the repository:

```bash
git clone https://github.com/divyesh077/nexora-ui.git
```

Navigate into the project:

```bash
cd nexora-ui
```

Install dependencies:

```bash
pnpm install
```

Start the development server using the project's configured development command:

```bash
pnpm dev
```

## 3. Create a Feature Branch

Create a separate branch for your contribution.

For a new component:

```bash
git switch -c feat/component-name
```

For a bug fix:

```bash
git switch -c fix/issue-description
```

For documentation:

```bash
git switch -c docs/documentation-topic
```

Use descriptive branch names that explain the purpose of the change.

## 4. Component Development Guidelines

When creating or modifying components:

- Use TypeScript with appropriate prop types.
- Follow the existing project structure.
- Prefer Base UI primitives where applicable.
- Use existing Nexora UI components and utilities when appropriate.
- Use Tailwind CSS for styling.
- Use semantic theme tokens instead of hardcoded colors.
- Preserve accessibility and keyboard interaction.
- Avoid unnecessary dependencies.
- Keep components focused and reusable.

Do not introduce a different primitive library or architectural pattern without discussing the change first.

## 5. Form Component Guidelines

For form-related contributions:

- Follow the existing React Hook Form integration.
- Use appropriate generic types for field values.
- Keep validation responsibilities in the consumer's schema.
- Use Zod examples where validation examples are needed.
- Preserve field labels, descriptions, and error accessibility.
- Handle disabled, required, and invalid states.
- Avoid duplicating logic that belongs in shared form components.

## 6. Code Quality

Before submitting a contribution, run the checks configured in the repository.

For example:

```bash
pnpm exec tsc --noEmit
```

If the project has configured lint, build, or test scripts, run those as well:

```bash
pnpm lint
pnpm build
pnpm test
```

Only run commands that exist in the project's `package.json`.

Resolve relevant errors before submitting your changes.

## 7. Registry Considerations

Nexora UI distributes components through its registry.

When adding a registry component:

1. Implement the component in the appropriate source directory.
2. Export it through the appropriate barrel files.
3. Add or update its registry definition.
4. Include all required registry dependencies and files.
5. Build the registry.
6. Inspect the generated registry JSON.
7. Test installation in a separate consumer application.

Do not consider a component complete until its registry installation has been verified.

## 8. Documentation

Update documentation whenever a contribution changes a public component API or introduces a new feature.

Documentation should include:

- Component purpose.
- Installation instructions, when applicable.
- Supported props.
- Usage examples.
- Customization details.
- Important limitations.

Document only functionality that is implemented and available.

## 9. Commit Changes

Use clear, descriptive commit messages.

Examples:

```bash
git add .
git commit -m "feat(forms): add reusable form component"
```

```bash
git add .
git commit -m "fix(forms): correct field error handling"
```

```bash
git add .
git commit -m "docs(forms): improve component documentation"
```

Use the appropriate commit type:

| Type       | Purpose               |
| ---------- | --------------------- |
| `feat`     | New functionality     |
| `fix`      | Bug fix               |
| `docs`     | Documentation changes |
| `refactor` | Code restructuring    |
| `test`     | Test changes          |
| `chore`    | Maintenance tasks     |

## 10. Submit a Pull Request

Push your branch:

```bash
git push -u origin feat/component-name
```

Then open a pull request against the repository's default branch.

Include:

- A clear title.
- A description of the changes.
- Related issue information, if applicable.
- Screenshots for visual changes.
- Testing steps and results.

Keep pull requests focused on one feature or related group of changes.

## 11. Review Checklist

Before submitting your pull request, verify:

- [ ] The component follows existing architecture.
- [ ] TypeScript types are correct.
- [ ] Accessibility is preserved.
- [ ] Styling follows the theme conventions.
- [ ] Required exports are included.
- [ ] Registry configuration is updated, if applicable.
- [ ] Registry installation has been tested, if applicable.
- [ ] Documentation is updated.
- [ ] Relevant checks pass.
- [ ] No unrelated changes are included.

Thank you for helping improve Nexora UI.
