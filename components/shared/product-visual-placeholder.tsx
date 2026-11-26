import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight, Camera, CheckCircle2 } from "lucide-react";

export interface ProductVisualModule {
  title: string;
  detail: string;
}

interface ProductVisualPlaceholderProps {
  productName: string;
  accent?: "blue" | "rose" | "amber";
  caption: string;
  modules: ProductVisualModule[];
  workflowFlow: string[];
  plannedAsset?: string;
}

const ACCENT_CLASSES = {
  blue: {
    border: "border-blue-200",
    bg: "bg-blue-50/40",
    pill: "bg-blue-100 text-blue-800",
    stepBg: "bg-blue-600 text-white",
    cardBorder: "border-blue-100",
    checkColor: "text-blue-600",
  },
  rose: {
    border: "border-rose-200",
    bg: "bg-rose-50/40",
    pill: "bg-rose-100 text-rose-800",
    stepBg: "bg-rose-600 text-white",
    cardBorder: "border-rose-100",
    checkColor: "text-rose-600",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50/40",
    pill: "bg-amber-100 text-amber-800",
    stepBg: "bg-amber-600 text-white",
    cardBorder: "border-amber-100",
    checkColor: "text-amber-700",
  },
};

/**
 * Neutral, structured product architecture & screenshot slot frame.
 * Complies with Phase 15 Authentic Screenshot Policy: no fake dashboards or AI UI.
 */
export function ProductVisualPlaceholder({
  productName,
  accent = "blue",
  caption,
  modules,
  workflowFlow,
  plannedAsset,
}: ProductVisualPlaceholderProps) {
  const theme = ACCENT_CLASSES[accent];

  return (
    <div
      className={`rounded-2xl border ${theme.border} ${theme.bg} p-5 sm:p-7 space-y-6`}
      aria-label={`${productName} workflow architecture preview`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${theme.pill}`}>
            <Layers className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">{productName} — Architecture Overview</div>
            <div className="text-xs text-slate-600">{caption}</div>
          </div>
        </div>
        <Badge variant="outline" className="text-[11px] bg-white">
          {plannedAsset ? `Screenshot Slot: ${plannedAsset}` : "Live Walkthrough Available via WhatsApp"}
        </Badge>
      </div>

      {/* Linear Workflow Diagram */}
      <div className="flex flex-wrap items-center gap-2">
        {workflowFlow.map((step, idx) => (
          <React.Fragment key={step}>
            <div className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${theme.stepBg}`}>
                {idx + 1}
              </span>
              <span>{step}</span>
            </div>
            {idx < workflowFlow.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0 hidden sm:inline" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Structured Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {modules.map((mod) => (
          <div
            key={mod.title}
            className={`rounded-xl border ${theme.cardBorder} bg-white p-3.5 space-y-1`}
          >
            <div className="text-xs font-semibold text-slate-900">{mod.title}</div>
            <div className="text-xs text-slate-600 leading-relaxed">{mod.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface ProductStoryBandProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  slotTitle: string;
  slotCaption: string;
  plannedFile: string;
  accent?: "blue" | "rose" | "amber";
  reverse?: boolean;
}

/**
 * Alternating SaaS storytelling section with a dedicated 16:9 screenshot slot
 * prepared for drop-in verified .webp captures without layout redesign.
 */
export function ProductStoryBand({
  eyebrow,
  title,
  description,
  bullets,
  slotTitle,
  slotCaption,
  plannedFile,
  accent = "blue",
  reverse = false,
}: ProductStoryBandProps) {
  const theme = ACCENT_CLASSES[accent];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className={`space-y-4 ${reverse ? "lg:order-2" : ""}`}>
        <Badge className={`${theme.pill} border-0 text-xs`}>{eyebrow}</Badge>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{description}</p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${theme.checkColor}`} aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${reverse ? "lg:order-1" : ""}`}>
        <figure
          className={`rounded-2xl border border-dashed ${theme.border} ${theme.bg} aspect-video p-6 flex flex-col items-center justify-center text-center space-y-3`}
        >
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${theme.pill}`}>
            <Camera className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-1 max-w-sm">
            <div className="text-sm font-bold text-slate-900">{slotTitle}</div>
            <p className="text-xs text-slate-600 leading-relaxed">{slotCaption}</p>
          </div>
          <span className="inline-block rounded-md bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-mono text-slate-600">
            Target capture: /images/products/{plannedFile}
          </span>
        </figure>
      </div>
    </div>
  );
}
