import { cn } from "@/lib/utils";

/**
 * A design-tool selection box with four corner handles.
 * `mode="hover"` reveals it on parent `.group` hover; `mode="always"` keeps it visible.
 */
export function SelectionHandles({ mode = "hover", className, inset = -5 }: { mode?: "hover" | "always"; className?: string; inset?: number }) {
  const visibility =
    mode === "hover"
      ? "opacity-0 scale-[1.04] group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
      : "opacity-100";
  const handle = "absolute size-[7px] border border-accent bg-white";
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute border border-accent transition-all duration-300 ease-out-expo", visibility, className)}
      style={{ inset }}
    >
      <span className={cn(handle, "-left-[4px] -top-[4px]")} />
      <span className={cn(handle, "-right-[4px] -top-[4px]")} />
      <span className={cn(handle, "-bottom-[4px] -left-[4px]")} />
      <span className={cn(handle, "-bottom-[4px] -right-[4px]")} />
    </span>
  );
}
