import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LinkButtonProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function LinkButton({
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
        }),
      )}
    />
  );
}
