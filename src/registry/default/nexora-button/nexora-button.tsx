import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type NexoraButtonProps = React.ComponentProps<typeof Button> & {
  fullWidth?: boolean;
};

export function NexoraButton({
  fullWidth = false,
  className,
  ...props
}: NexoraButtonProps) {
  return <Button {...props} className={cn(fullWidth && "w-full", className)} />;
}
