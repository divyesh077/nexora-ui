"use client";

import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { useFormContext, useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";

export type FormSubmitButtonProps = Omit<
  ComponentProps<typeof Button>,
  "type" | "disabled" | "children"
> & {
  children?: ReactNode;
  loader?: ReactNode;
  loadingText?: string;
  disabled?: boolean;
  disableWhileSubmitting?: boolean;
};

export function FormSubmitButton({
  children = "Submit",
  loader,
  loadingText = "Submitting...",
  disabled = false,
  disableWhileSubmitting = true,
  className,
  ...buttonProps
}: FormSubmitButtonProps) {
  const { control } = useFormContext();
  const { isSubmitting } = useFormState({ control });

  const isDisabled = disabled || (disableWhileSubmitting && isSubmitting);

  const loaderComp = loader ?? <Loader2 className="size-4 animate-spin" />;
  return (
    <Button
      {...buttonProps}
      type="submit"
      disabled={isDisabled}
      aria-busy={isSubmitting || undefined}
      className={className}
    >
      {isSubmitting && loaderComp}

      {isSubmitting ? loadingText : children}
    </Button>
  );
}
