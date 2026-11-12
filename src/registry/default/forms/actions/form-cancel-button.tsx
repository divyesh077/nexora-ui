"use client";

import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

export type FormCancelButtonProps = Omit<
  ComponentProps<typeof Button>,
  "type" | "children"
> & {
  children?: ReactNode;
};

export function FormCancelButton({
  children = "Cancel",
  ...buttonProps
}: FormCancelButtonProps) {
  return (
    <Button {...buttonProps} type="button">
      {children}
    </Button>
  );
}
