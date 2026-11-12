# Utilities

Nexora UI provides shared utility functions that help simplify common development tasks.

The current utility exports are:

| Utility | Purpose                            |
| ------- | ---------------------------------- |
| `cn`    | Re-exports the class name utility. |
| `sleep` | Creates an asynchronous delay.     |

## 1. Import

```tsx
import { cn, sleep } from "@/lib/utils";
```

Adjust the import path according to your project structure.

## 2. cn

The `cn` utility is re-exported from the `cn` package.

```tsx
export { cn } from "cn";
```

Use it wherever you need the functionality provided by that package.

Example:

```tsx
import { cn } from "@/lib/utils";

const className = cn(
  "rounded-md p-4",
  isActive && "bg-primary text-primary-foreground",
);
```

Refer to the installed `cn` package documentation for its exact class-merging behavior.

## 3. sleep

The `sleep` utility creates a Promise that resolves after a specified number of seconds.

### Implementation

```tsx
export function sleep(durationSec: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * durationSec));
}
```

### Parameters

| Parameter     | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `durationSec` | `number` | Delay duration in seconds. |

### Return Value

Returns a `Promise` that resolves after the specified duration.

### Basic Usage

```tsx
import { sleep } from "@/lib/utils";

async function handleAction() {
  console.log("Started");

  await sleep(2);

  console.log("Completed after 2 seconds");
}
```

### Use with Loading States

```tsx
const [isLoading, setIsLoading] = useState(false);

async function handleSubmit() {
  setIsLoading(true);

  try {
    await sleep(2);

    // Continue processing.
  } finally {
    setIsLoading(false);
  }
}
```

The example uses a simulated delay. In production, use the actual asynchronous operation instead of adding an artificial delay.

## 4. Best Practices

- Keep shared utilities reusable and independent of application-specific business logic.
- Use `cn` for class name composition according to the package's supported behavior.
- Use `sleep` primarily for development, testing, or intentional timing behavior.
- Avoid artificial delays in production API workflows.

## Current Utility Exports

```tsx
export { cn } from "cn";

export function sleep(durationSec: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * durationSec));
}
```

Add documentation here whenever new shared utilities are implemented.
