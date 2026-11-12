import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type FlexDirection = "row" | "column";

type FormActionsProps = React.ComponentProps<typeof FieldGroup> & {
  flexDirection?: FlexDirection;
};
export function FormActions({
  children,
  className,
  flexDirection = "row",
  ...props
}: FormActionsProps) {
  return (
    <FieldGroup
      className={cn(flexDirection === "row" && "flex-row", className)}
      {...props}
    >
      {children}
    </FieldGroup>
  );
}
