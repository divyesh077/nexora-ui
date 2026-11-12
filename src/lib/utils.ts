export { cn } from "cn";

export function sleep(durationSec: number) {
    return new Promise((resolve) => setTimeout(resolve, 1000 * durationSec))
}
