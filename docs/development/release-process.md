# Release Process

This guide describes the recommended process for preparing, validating, and publishing Nexora UI releases.

The goal is to ensure that every release is tested, documented, and installable through the public registry.

## 1. Release Workflow

A typical release follows these stages:

1. Complete development.
2. Review and merge changes.
3. Validate the registry.
4. Test installation in a consumer application.
5. Update documentation.
6. Publish the release.
7. Verify the published registry.

```text
Feature Development
        |
        v
 Code Review
        |
        v
 Merge into Main
        |
        v
 Registry Build
        |
        v
 Consumer Testing
        |
        v
 Publish Release
        |
        v
 Verify Deployment
```

## 2. Prepare for a Release

Before preparing a release:

- Ensure all intended feature branches have been merged.
- Confirm that the main branch contains the latest approved changes.
- Review component APIs for unintended breaking changes.
- Update documentation.
- Check for unresolved bugs.
- Confirm that the registry configuration is correct.

Start from an updated main branch:

```bash
git switch main
git pull origin main
```

## 3. Validate the Project

Run the checks configured in the repository.

For example:

```bash
pnpm exec tsc --noEmit
```

If available in `package.json`, also run:

```bash
pnpm lint
pnpm build
pnpm test
```

Resolve relevant errors before proceeding.

## 4. Build and Validate the Registry

Build the registry:

```bash
pnpm dlx shadcn@latest build
```

Inspect the generated files under:

```text
public/r/
```

Verify:

- Every intended registry item is generated.
- JSON files are valid.
- Component files are included.
- Required dependencies are declared.
- Registry dependencies are correct.
- No unintended components or files are included.

## 5. Test Consumer Installation

Test the release in a separate consumer application.

Use the local registry during validation:

```json
{
  "registries": {
    "@nexora": "http://localhost:3001/r/{name}.json"
  }
}
```

Install the intended components:

```bash
pnpm dlx shadcn@latest add @nexora/nexora-forms
```

Verify that:

- Installation completes successfully.
- All required files are generated.
- Imports resolve correctly.
- Components render correctly.
- Form validation and interactions work.
- Styling is consistent with the consumer application's theme.

Test newly added or modified registry items, not just one previously working component.

## 6. Versioning

Use semantic versioning when maintaining published package or release versions.

The format is:

```text
MAJOR.MINOR.PATCH
```

| Version | Meaning                      | Example |
| ------- | ---------------------------- | ------- |
| MAJOR   | Breaking changes             | 2.0.0   |
| MINOR   | Backward-compatible features | 1.1.0   |
| PATCH   | Backward-compatible fixes    | 1.0.1   |

Examples:

- Add a new component: MINOR release.
- Fix a component bug without changing its API: PATCH release.
- Remove or rename a public prop: potentially a MAJOR release.

If the registry is currently distributed as individual shadcn registry items rather than a versioned package, treat these as release-planning conventions. Do not imply that the registry automatically enforces semantic versions.

## 7. Publishing

Nexora UI hosts its public registry through GitHub Pages.

Public registry URL pattern:

```text
https://divyesh077.github.io/nexora-ui/r/{name}.json
```

Follow the repository's configured GitHub Actions publishing workflow.

After pushing the approved changes:

1. Open the repository's Actions tab.
2. Check the publishing workflow.
3. Confirm that deployment completes successfully.
4. Open the public registry URL.
5. Verify that the published JSON contains the expected changes.

Do not announce a release until the public registry has been verified.

## 8. Release Notes

Maintain release notes describing meaningful changes.

A release note should include:

- New components.
- New features.
- Bug fixes.
- Improvements.
- Breaking changes.
- Migration instructions, when required.

Example:

```markdown
# Release 1.1.0

## Added

- Added reusable form components.
- Added FormInputGroupTextarea.

## Improved

- Improved form field accessibility.
- Improved component styling consistency.

## Fixed

- Fixed form validation error handling.
```

Keep release notes factual and limited to changes included in that release.

## 9. Post-Release Verification

After publishing:

- [ ] GitHub Actions deployment succeeded.
- [ ] Public registry URLs are accessible.
- [ ] Registry JSON contains the latest changes.
- [ ] Consumer installation succeeds using the public registry.
- [ ] Installed components render correctly.
- [ ] Documentation reflects the released APIs.
- [ ] Release notes are available.

If a problem is discovered, investigate the affected registry item and publish a corrective update after testing.

## 10. Release Checklist

- [ ] Changes are merged into the main branch.
- [ ] TypeScript checks pass.
- [ ] Lint, build, and tests pass where configured.
- [ ] Registry build succeeds.
- [ ] Generated registry files are inspected.
- [ ] Consumer installation is tested.
- [ ] Documentation is updated.
- [ ] Release notes are prepared.
- [ ] GitHub Pages deployment succeeds.
- [ ] Public registry is verified.
