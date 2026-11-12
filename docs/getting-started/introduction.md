# Introduction to Nexora UI

## What is Nexora UI?

Nexora UI is a reusable UI component library designed to help developers build modern, accessible, and maintainable React applications.

It provides customizable UI components, form components, and reusable building blocks that can be integrated directly into your application.

Nexora UI follows the shadcn/ui approach, allowing developers to install component source code into their projects and customize it according to their requirements.

## Goals and Philosophy

Nexora UI focuses on the following principles:

### 1. Reusability

Build reusable components that can be shared across multiple applications without duplicating implementation code.

### 2. Customization

Components are installed as source code, allowing developers to customize styling, behavior, and structure.

### 3. Type Safety

Use TypeScript to provide strongly typed component properties, form fields, and reusable APIs.

### 4. Accessibility

Build accessible interfaces using appropriate semantic HTML, keyboard interactions, labels, and accessibility attributes.

### 5. Consistency

Maintain consistent design patterns, styling conventions, and component APIs throughout the library.

### 6. Developer Experience

Provide TypeScript support, Tailwind CSS autocomplete, reusable form abstractions, and straightforward installation commands.

## Technology Stack

Nexora UI uses the following technologies:

| Technology      | Purpose                                      |
| --------------- | -------------------------------------------- |
| React           | Component development                        |
| Next.js         | Development environment and registry hosting |
| TypeScript      | Type safety                                  |
| Tailwind CSS    | Styling                                      |
| shadcn/ui       | Component registry ecosystem                 |
| Base UI         | Accessible UI primitives                     |
| React Hook Form | Form state management                        |
| Zod             | Schema validation                            |
| date-fns        | Date formatting and utilities                |
| Lucide React    | Icons                                        |
| PNPM            | Package management                           |

## Component Architecture

Nexora UI organizes reusable components into logical categories.

### UI Components

The foundational UI components provide the building blocks for application interfaces.

Examples:

- Button
- Input
- Checkbox
- Select
- Radio Group
- Switch
- Textarea
- Input Group
- Field
- Calendar
- Popover

### Form Components

The Forms library provides reusable form abstractions built on React Hook Form.

Examples:

- Form
- FormField
- FormInput
- FormNumberInput
- FormTextarea
- FormSelect
- FormCheckbox
- FormCheckboxGroup
- FormRadioGroup
- FormSwitch
- FormDatePicker
- FormInputGroup
- FormInputGroupTextarea

### Layout Components

Reusable layout components help organize form content.

Examples:

- FormActions

### Action Components

Reusable form actions provide consistent interaction patterns.

Examples:

- FormSubmitButton
- FormResetButton
- FormCancelButton

## Registry Architecture

Nexora UI uses the shadcn registry ecosystem to distribute components.

Instead of requiring developers to install the entire library as a runtime dependency, the registry allows them to add individual components or component collections directly to their applications.

### How installation works

1. A component is developed and maintained in the Nexora UI repository.
2. The component is registered in `registry.json`.
3. The registry build process generates JSON files.
4. Generated registry files are hosted through the configured registry URL.
5. Developers install components using the shadcn CLI.
6. Component source code is added to their application.

### Registry workflow

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
 Registry Hosting
       |
       v
 Consumer Application
       |
       v
 Installed Components
```

## Project Structure

The Nexora UI repository separates component source code, generated registry files, documentation, and application code.

```text
nexora-ui/
├── docs/
│   ├── getting-started/
│   ├── components/
│   ├── forms/
│   ├── guides/
│   └── development/
│
├── src/
│   ├── app/
│   ├── components/
│   └── registry/
│       └── default/
│
├── public/
│   └── r/
│
├── registry.json
├── components.json
├── package.json
└── README.md
```

- `docs/`: Project and component documentation.
- `src/app/`: Next.js application pages and playground.
- `src/components/`: Local UI
