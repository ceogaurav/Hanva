import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm" | "lg" | "narrow";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-7xl",
        size === "sm" && "max-w-4xl",
        size === "lg" && "max-w-[1400px]",
        size === "narrow" && "max-w-3xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
