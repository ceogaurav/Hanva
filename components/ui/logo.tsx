import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  inverted?: boolean;
  priority?: boolean;
}

export function Logo({
  className,
  imageClassName,
  size = "md",
  showText = true,
  inverted = false,
  priority = false,
}: LogoProps) {
  const dimensions = {
    sm: { px: 28, imgClass: "h-7 w-7" },
    md: { px: 36, imgClass: "h-9 w-9" },
    lg: { px: 44, imgClass: "h-11 w-11" },
    xl: { px: 56, imgClass: "h-14 w-14" },
  }[size];

  return (
    <div className={cn("flex items-center space-x-2.5", className)}>
      <div className={cn("relative shrink-0 rounded-full overflow-hidden bg-white shadow-xs flex items-center justify-center border border-slate-100", dimensions.imgClass, imageClassName)}>
        <Image
          src="/logo.png"
          alt="Hanva Technologies Logo"
          width={dimensions.px}
          height={dimensions.px}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={cn(
              "text-lg font-extrabold tracking-tight leading-none",
              inverted ? "text-white" : "text-slate-900"
            )}
          >
            HANVA
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-widest leading-tight mt-0.5",
              inverted ? "text-slate-400" : "text-blue-600"
            )}
          >
            Technologies
          </span>
        </div>
      )}
    </div>
  );
}
