"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";
import { trackProductDemoInteraction } from "@/lib/analytics";
import {
  PhoneCall,
  UserCheck,
  Calendar,
  BarChart3,
  CheckCircle2,
  Play,
  RotateCcw,
  Shield,
  Layers,
  ArrowRight,
  MessageSquare,
  ExternalLink,
  Users,
} from "lucide-react";

interface WorkflowStage {
  id: string;
  stepNumber: string;
  title: string;
  shortDesc: string;
  leadState: {
    leadName: string;
    company: string;
    channel: string;
    status: string;
    priority: "High" | "Medium" | "Urgent";
    assignedTo: string;
    lastAction: string;
    nextStep: string;
    telephonyOutcome?: string;
  };
  keyAction: string;
  managerVisibility: string;
}

const CRM_STAGES: WorkflowStage[] = [
  {
    id: "enquiry",
    stepNumber: "01",
    title: "1. Inbound Enquiry Capture",
    shortDesc: "Automated webhook capture from Meta Ads, website forms, and incoming IVR pilot numbers.",
    leadState: {
      leadName: "V. Sharma",
      company: "Apex Logistics India",
      channel: "Website Webhook / Google Ads",
      status: "Fresh Unassigned",
      priority: "High",
      assignedTo: "Unassigned Queue",
      lastAction: "Form submitted 4 minutes ago",
      nextStep: "Round-Robin Auto Allocation",
    },
    keyAction: "Instant 10-digit phone deduplication & source tag binding",
    managerVisibility: "Zero lead drops; immediate lead presence in admin inbox",
  },
  {
    id: "assignment",
    stepNumber: "02",
    title: "2. Smart Lead Allocation",
    shortDesc: "Automated round-robin distribution to available telecallers with role permissioning.",
    leadState: {
      leadName: "V. Sharma",
      company: "Apex Logistics India",
      channel: "Website Webhook",
      status: "Assigned to Queue",
      priority: "High",
      assignedTo: "Priya M. (Senior Telecaller)",
      lastAction: "Lead pushed to agent softphone queue",
      nextStep: "1-Click C2C Outbound Call",
    },
    keyAction: "Masked phone details & strict export lock preventing data theft",
    managerVisibility: "Active agent load balancing & allocation audit trail",
  },
  {
    id: "c2c_call",
    stepNumber: "03",
    title: "3. 1-Click C2C Calling",
    shortDesc: "Carrier-grade click-to-call dialing via CloudConnect, Ozonetel, or Fonada directly in browser.",
    leadState: {
      leadName: "V. Sharma",
      company: "Apex Logistics India",
      channel: "Outbound Cloud C2C",
      status: "In Call (Connected: 03m 42s)",
      priority: "High",
      assignedTo: "Priya M.",
      lastAction: "Agent clicked dial button",
      nextStep: "Log Call Disposition & Notes",
      telephonyOutcome: "PSTN Bridge Connected (CloudConnect)",
    },
    keyAction: "Live dual-channel audio recording & wallet duration tracking",
    managerVisibility: "Real-time active call indicator & live telephony wallet balance",
  },
  {
    id: "disposition",
    stepNumber: "04",
    title: "4. Disposition & Reminders",
    shortDesc: "Post-call outcome logging prompts agent for notes and sets calendar callback alert.",
    leadState: {
      leadName: "V. Sharma",
      company: "Apex Logistics India",
      channel: "Call Disposition Logged",
      status: "Demo Scheduled",
      priority: "High",
      assignedTo: "Priya M. -> Transferred to Sales Closer",
      lastAction: "Logged: 'Interested in 25-seat call center with IVR'",
      nextStep: "Meeting on Thursday, 3:30 PM IST",
      telephonyOutcome: "Call Completed: 04m 12s (Recording Saved)",
    },
    keyAction: "Instant WhatsApp meeting confirmation sent via Fonada WABA template",
    managerVisibility: "Calendar sync; no unlogged dispositions allowed",
  },
  {
    id: "pipeline_closer",
    stepNumber: "05",
    title: "5. Sales Pipeline & KYC Vault",
    shortDesc: "Closer moves deal through visual pipeline stages and collects verified KYC documents.",
    leadState: {
      leadName: "V. Sharma",
      company: "Apex Logistics India",
      channel: "Deal Pipeline: Negotiation",
      status: "KYC Documents Pending",
      priority: "High",
      assignedTo: "Arun K. (Account Executive)",
      lastAction: "Sent quotation for 25 seats + 2 DID lines",
      nextStep: "Verify GSTIN & PAN in KYC Vault",
    },
    keyAction: "Secure document upload link with isolated storage vault",
    managerVisibility: "Weighted pipeline value & deal stage velocity metrics",
  },
  {
    id: "reporting",
    stepNumber: "06",
    title: "6. QA Audits & Executive Reports",
    shortDesc: "Team leaders audit browser call recordings, review agent talk time, and analyze conversion.",
    leadState: {
      leadName: "V. Sharma",
      company: "Apex Logistics India",
      channel: "Closed Won",
      status: "Contracted Customer",
      priority: "High",
      assignedTo: "Onboarding Team",
      lastAction: "Payment confirmed; account provisioned",
      nextStep: "Ongoing Customer Success",
      telephonyOutcome: "Recording Audited: Score 9.5/10",
    },
    keyAction: "HTML5 in-browser audio playback & executive disbursement dashboard",
    managerVisibility: "Comprehensive telecaller scorecard, talk-time, and conversion ROI",
  },
];

export function CrmWorkflowExplorer() {
  const [activeStageIndex, setActiveStageIndex] = React.useState(0);
  const [roleView, setRoleView] = React.useState<"telecaller" | "closer" | "manager">("telecaller");
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  const currentStage = CRM_STAGES[activeStageIndex];
  const whatsappUrl = buildSaasDemoWhatsAppUrl("crm");

  const handleStageSelect = (idx: number) => {
    setActiveStageIndex(idx);
    setIsPlayingAudio(false);
    trackProductDemoInteraction("hanva_crm", CRM_STAGES[idx].id, "stage_click");
  };

  return (
    <div className="rounded-2xl border border-blue-200 bg-white shadow-xs overflow-hidden">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 text-xs">
              Interactive Educational Simulation
            </Badge>
            <span className="text-xs text-slate-400 font-mono">Educational Concept • Synthetic Data (Zero PII)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Hanva CRM — End-to-End Operational Workflow Explorer
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Click through the 6 stages below to see how leads move from webhook capture to C2C calling and manager audit.
          </p>
          <p className="text-[11px] text-blue-200/80 italic pt-0.5">
            Note: This interactive educational simulation demonstrates core CRM workflows using synthetic data. It is not connected to a live production database or carrier telephony trunk.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="inline-flex rounded-lg bg-slate-800 p-1 border border-slate-700 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              setRoleView("telecaller");
              trackProductDemoInteraction("hanva_crm", "role_telecaller", "role_toggle");
            }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              roleView === "telecaller" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Telecaller View
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleView("closer");
              trackProductDemoInteraction("hanva_crm", "role_closer", "role_toggle");
            }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              roleView === "closer" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Closer View
          </button>
          <button
            type="button"
            onClick={() => {
              setRoleView("manager");
              trackProductDemoInteraction("hanva_crm", "role_manager", "role_toggle");
            }}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              roleView === "manager" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Manager View
          </button>
        </div>
      </div>

      {/* Stage Tabs Navigation */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {CRM_STAGES.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-blue-700 shadow-xs border border-blue-200 font-bold"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {stg.stepNumber}
                </span>
                <span>{stg.title.split(". ")[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Demonstration Panel */}
      <div className="p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Stage {currentStage.stepNumber} of 06
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">{currentStage.title}</h4>
            <p className="text-xs sm:text-sm text-slate-600">{currentStage.shortDesc}</p>
          </div>
          <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto bg-slate-50">
            Role Focus: {roleView.toUpperCase()}
          </Badge>
        </div>

        {/* Live Simulated Lead Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Simulated Card */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="space-y-0.5">
                <div className="text-xs text-slate-500 font-mono">Lead Record URN: #APX-80429</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{currentStage.leadState.company}</span>
                  <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-800">
                    {currentStage.leadState.priority} Priority
                  </Badge>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-medium">
                {currentStage.leadState.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                <span className="text-slate-500 block">Contact Person:</span>
                <span className="font-semibold text-slate-900">{currentStage.leadState.leadName}</span>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                <span className="text-slate-500 block">Acquisition Channel:</span>
                <span className="font-semibold text-slate-900 truncate block">{currentStage.leadState.channel}</span>
              </div>
              <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                <span className="text-slate-500 block">Assigned Owner:</span>
                <span className="font-semibold text-slate-900 truncate block">{currentStage.leadState.assignedTo}</span>
              </div>
            </div>

            <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Last Interaction:</span>
                <span className="text-slate-700">{currentStage.leadState.lastAction}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Immediate Next Step:</span>
                <span className="text-blue-700 font-semibold">{currentStage.leadState.nextStep}</span>
              </div>
              {currentStage.leadState.telephonyOutcome && (
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-slate-500 font-medium">Telephony Trunk:</span>
                  <span className="text-emerald-700 font-mono text-[11px]">{currentStage.leadState.telephonyOutcome}</span>
                </div>
              )}
            </div>

            {/* Interactive Action Drilldown */}
            {activeStageIndex === 2 && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-900 flex items-center gap-1.5">
                    <PhoneCall className="h-4 w-4 text-blue-600 animate-pulse" />
                    Live C2C Telephony Call Simulation
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">Duration: 03m 42s</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Carrier PSTN leg dialed telecaller Priya M. first, then bridged prospect +91 98XXX-XXXXX without exposing personal SIM credentials.
                </p>
              </div>
            )}

            {activeStageIndex === 5 && (
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Play className="h-3.5 w-3.5 text-blue-600" />
                    In-Browser Call Recording Audio Player (Simulated)
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      setIsPlayingAudio(!isPlayingAudio);
                      trackProductDemoInteraction("hanva_crm", "audio_preview", "play_toggle");
                    }}
                  >
                    {isPlayingAudio ? "Pause Recording" : "Preview 15s Snippet"}
                  </Button>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`bg-blue-600 h-full transition-all duration-300 ${
                      isPlayingAudio ? "w-3/4 animate-pulse" : "w-1/4"
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Direct HTML5 audio playback inside manager dashboard—no downloading bulky raw WAV files.
                </p>
              </div>
            )}
          </div>

          {/* Right Architecture & Benefits Sidecar */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 flex flex-col justify-between text-xs">
            <div className="space-y-3">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>Verified System Mechanism</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{currentStage.keyAction}</p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  <span>Manager Visibility Benefit</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{currentStage.managerVisibility}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Button asChild variant="primary" size="sm" className="w-full">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="product_section"
                  productName="hanva_crm"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/crm/"
                >
                  <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                  <span>Request Live CRM Demo</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </TrackedWhatsAppLink>
              </Button>
              <p className="text-[10px] text-slate-500 text-center mt-1.5">
                Contact us for pricing. Opens WhatsApp (+91 8423711043).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
