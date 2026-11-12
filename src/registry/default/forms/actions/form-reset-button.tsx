"use client";

import type { ComponentProps, ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

type ButtonOnClick = NonNullable<ComponentProps<typeof Button>["onClick"]>;

export type FormResetButtonProps = Omit<
  ComponentProps<typeof Button>,
  "type" | "children"
> & {
  children?: ReactNode;
};

export function FormResetButton({
  children = "Reset",
  onClick,
  ...buttonProps
}: FormResetButtonProps) {
  const { reset } = useFormContext();

  const handleReset: ButtonOnClick = (event) => {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    reset();
  };

  return (
    <Button {...buttonProps} type="button" onClick={handleReset}>
      {children}
    </Button>
  );
}
