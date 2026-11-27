"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";
import { trackProductDemoInteraction } from "@/lib/analytics";
import {
  UtensilsCrossed,
  Printer,
  Wifi,
  WifiOff,
  Layers,
  ChefHat,
  MessageSquare,
  ExternalLink,
  Sparkles,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

interface PosStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  stationRole: string;
  simulatedData: {
    table: string;
    covers: number;
    captain: string;
    items: string[];
    subtotal: number;
    gstAmount: number;
    totalAmount: number;
    kotRouting: string;
    kdsStatus: string;
    offlineQueueState: string;
    recipeBOM: string;
  };
  operationalDetail: string;
  businessBenefit: string;
}

const POS_STAGES: PosStage[] = [
  {
    id: "table_order",
    stepNumber: "01",
    title: "1. Table Order & Captain PWA",
    subtitle: "Floor captain takes order table-side on tablet or guests scan table QR code.",
    stationRole: "Floor Captain / Table QR",
    simulatedData: {
      table: "Table T-06 (Indoor AC)",
      covers: 3,
      captain: "Ramesh S.",
      items: ["Murgh Makhani (Medium Spice)", "Butter Naan (2 pcs)", "Fresh Lime Soda (Sweet)"],
      subtotal: 920,
      gstAmount: 46,
      totalAmount: 966,
      kotRouting: "Queued for instant station split",
      kdsStatus: "Incoming Order Notification",
      offlineQueueState: "IndexedDB Local Sync Active",
      recipeBOM: "BOM Recipe Mapping Verified",
    },
    operationalDetail: "Captain selects food modifiers (Boneless, Medium Spice) directly at table-side with 1 tap.",
    businessBenefit: "Eliminates handwritten slips and prevents kitchen miscommunication on spice levels.",
  },
  {
    id: "kot_routing",
    stepNumber: "02",
    title: "2. Multi-Station KOT Thermal Printing",
    subtitle: "System routes drinks to Bar printer and food dishes to Main Kitchen printer simultaneously.",
    stationRole: "Station Thermal Printers",
    simulatedData: {
      table: "Table T-06",
      covers: 3,
      captain: "Ramesh S.",
      items: [
        "[Bar Printer @ 192.168.1.100] Fresh Lime Soda",
        "[Kitchen Printer @ 192.168.1.101] Murgh Makhani, 2x Butter Naan",
      ],
      subtotal: 920,
      gstAmount: 46,
      totalAmount: 966,
      kotRouting: "Split KOT Printed (Ticket #KOT-418)",
      kdsStatus: "Transmitted to Kitchen Line",
      offlineQueueState: "Local ESC/POS Bridge Printed",
      recipeBOM: "Queued for inventory depletion",
    },
    operationalDetail: "ESC/POS network printers cut separate tickets with duplicate-print lock to avoid duplicate prep.",
    businessBenefit: "Kitchen and bar receive simultaneous prep orders within 1.5 seconds of order entry.",
  },
  {
    id: "kds_screen",
    stepNumber: "03",
    title: "3. Live Kitchen Display System (KDS)",
    subtitle: "Chefs view preparation timer and bump completed tickets to notify runners.",
    stationRole: "Head Chef & Line Cooks",
    simulatedData: {
      table: "Table T-06",
      covers: 3,
      captain: "Ramesh S.",
      items: ["Murgh Makhani (Prep: 09m 20s)", "Butter Naan (Tandoor Ready)"],
      subtotal: 920,
      gstAmount: 46,
      totalAmount: 966,
      kotRouting: "KOT Acknowledged",
      kdsStatus: "Active Cooking • Timer: Green (09m 20s)",
      offlineQueueState: "Local WebSocket Synced",
      recipeBOM: "Raw Materials Reserved",
    },
    operationalDetail: "Color-coded KDS screen warns chef before tickets breach 15-minute preparation threshold.",
    businessBenefit: "Reduces table turnaround delays and improves customer dining satisfaction.",
  },
  {
    id: "offline_resilience",
    stepNumber: "04",
    title: "4. Offline IndexedDB Failover",
    subtitle: "If restaurant broadband drops, billing counters continue running with zero downtime.",
    stationRole: "Cashier / Front Terminal",
    simulatedData: {
      table: "Table T-06",
      covers: 3,
      captain: "Ramesh S.",
      items: ["Full Order Confirmed"],
      subtotal: 920,
      gstAmount: 46,
      totalAmount: 966,
      kotRouting: "Local Network Queue Intact",
      kdsStatus: "Offline Cache Synchronized",
      offlineQueueState: "OFFLINE RESILIENT: 1 Order Pending Sync",
      recipeBOM: "Locally Deducted in Browser Ledger",
    },
    operationalDetail: "Browser IndexedDB stores order and issues receipt locally, syncing automatically upon Wi-Fi return.",
    businessBenefit: "Dinner rush billing never freezes during frequent Indian broadband or Wi-Fi fluctuations.",
  },
  {
    id: "gst_upi_billing",
    stepNumber: "05",
    title: "5. GST Billing & Dynamic UPI QR",
    subtitle: "Instant 5% GST computation and dynamic NPCI UPI QR code printed directly on customer check.",
    stationRole: "Cashier Terminal",
    simulatedData: {
      table: "Table T-06",
      covers: 3,
      captain: "Ramesh S.",
      items: ["Food Subtotal: ₹920.00", "5% GST: ₹46.00 (2.5% CGST ₹23 + 2.5% SGST ₹23)"],
      subtotal: 920,
      gstAmount: 46,
      totalAmount: 966,
      kotRouting: "KOT Complete",
      kdsStatus: "Order Served",
      offlineQueueState: "Cloud Synced",
      recipeBOM: "Final Stock Depleted",
    },
    operationalDetail: "Guests scan UPI QR on thermal bill via Google Pay, PhonePe, or Paytm with exact amount locked.",
    businessBenefit: "Cuts guest payment settlement wait times from 5 minutes down to 30 seconds.",
  },
  {
    id: "recipe_costing",
    stepNumber: "06",
    title: "6. Recipe BOM Inventory & Day-End Z-Report",
    subtitle: "Automated depletion of raw materials (chicken, butter, dairy) and evening cash drawer closing.",
    stationRole: "Restaurateur / F&B Manager",
    simulatedData: {
      table: "Table T-06",
      covers: 3,
      captain: "Ramesh S.",
      items: ["Invoice #POS-2026-904"],
      subtotal: 920,
      gstAmount: 46,
      totalAmount: 966,
      kotRouting: "Archived in Day Ledger",
      kdsStatus: "Kitchen Shift Closed",
      offlineQueueState: "100% Transactions Synced",
      recipeBOM: "Deducted: 350g Boneless Chicken, 60g Butter, 150g Maida, 1 Fresh Lime",
    },
    operationalDetail: "Recipe BOM deducts actual ingredient consumption, calculating daily food cost margin variance.",
    businessBenefit: "Protects food margins by catching kitchen pilferage and raw material wastage early.",
  },
];

export function RestaurantPosExplorer() {
  const [activeStageIndex, setActiveStageIndex] = React.useState(0);
  const [simulatedOffline, setSimulatedOffline] = React.useState(false);
  const currentStage = POS_STAGES[activeStageIndex];
  const whatsappUrl = buildSaasDemoWhatsAppUrl("pos");

  const handleStageSelect = (idx: number) => {
    setActiveStageIndex(idx);
    trackProductDemoInteraction("hanva_restaurant_pos", POS_STAGES[idx].id, "stage_click");
  };

  return (
    <div className="rounded-2xl border border-amber-200 bg-white shadow-xs overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 text-xs">
              Interactive Educational Simulation
            </Badge>
            <span className="text-xs text-slate-400 font-mono">Educational Concept • Synthetic F&amp;B Data</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Hanva Restaurant POS — Order to Kitchen (KOT/KDS), Billing &amp; Recipe BOM
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Click through the 6 stages of restaurant operations: table order, KOT thermal routing, live KDS screen, offline resilience, and UPI settlement.
          </p>
          <p className="text-[11px] text-amber-200/80 italic pt-0.5">
            Note: This interactive educational simulation demonstrates restaurant rush-hour operations using synthetic test fixtures. It is not connected to a live kitchen network.
          </p>
        </div>

        {/* Offline Simulation Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <span className="text-xs text-slate-300 font-medium">Wi-Fi Test:</span>
          <button
            type="button"
            onClick={() => {
              setSimulatedOffline(!simulatedOffline);
              trackProductDemoInteraction("hanva_restaurant_pos", "offline_toggle", "wifi_test");
            }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
              simulatedOffline ? "bg-amber-600 text-white" : "bg-emerald-600 text-white"
            }`}
          >
            {simulatedOffline ? (
              <>
                <WifiOff className="h-3.5 w-3.5" />
                <span>Simulated Offline Mode</span>
              </>
            ) : (
              <>
                <Wifi className="h-3.5 w-3.5" />
                <span>Broadband Connected</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Offline Alert Banner */}
      {simulatedOffline && (
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0" />
            <span>
              <strong>IndexedDB Offline Queue Active:</strong> Cashiers can continue punching orders and printing bills locally. Transactions queue safely in local browser storage.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-amber-200">
            Pending Sync: 1 Order
          </span>
        </div>
      )}

      {/* Stage Tabs Navigation */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {POS_STAGES.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-amber-800 shadow-xs border border-amber-300 font-bold"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? "bg-amber-700 text-white" : "bg-slate-200 text-slate-700"
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

      {/* Interactive Stage Content */}
      <div className="p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Stage {currentStage.stepNumber} of 06
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">{currentStage.title}</h4>
            <p className="text-xs sm:text-sm text-slate-600">{currentStage.subtitle}</p>
          </div>
          <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-xs self-start sm:self-auto">
            Station: {currentStage.stationRole}
          </Badge>
        </div>

        {/* Live Simulation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Visual Ticket Box */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="space-y-0.5">
                <div className="text-xs text-slate-500 font-mono">Ticket: #KOT-POS-8042</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-amber-700" />
                  <span>{currentStage.simulatedData.table}</span>
                  <Badge variant="outline" className="text-[10px] bg-white">
                    {currentStage.simulatedData.covers} Guests
                  </Badge>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs font-medium">
                Captain: {currentStage.simulatedData.captain}
              </Badge>
            </div>

            {/* Dishes & Bill Breakdown */}
            <div className="rounded-lg bg-white p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex justify-between">
                <span>Ordered Dishes &amp; Thermal Station Split</span>
                <span>Amount (INR)</span>
              </div>
              {currentStage.simulatedData.items.map((it, i) => (
                <div key={i} className="flex justify-between text-slate-700 font-medium">
                  <span>{it}</span>
                  <span className="font-mono text-slate-500">KOT Routed</span>
                </div>
              ))}
              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-100">
                <span>Food Subtotal</span>
                <span className="font-mono">₹{currentStage.simulatedData.subtotal}.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>India GST (5%: 2.5% CGST ₹23 + 2.5% SGST ₹23)</span>
                <span className="font-mono">₹{currentStage.simulatedData.gstAmount}.00</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-1.5 border-t border-slate-200">
                <span>Total Due</span>
                <span className="font-mono text-amber-800">₹{currentStage.simulatedData.totalAmount}.00</span>
              </div>
            </div>

            {/* Station Status Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium block">Thermal KOT Status:</span>
                <span className="font-semibold text-slate-900 block flex items-center gap-1.5">
                  <Printer className="h-3.5 w-3.5 text-blue-600" />
                  {currentStage.simulatedData.kotRouting}
                </span>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium block">Live Kitchen Display (KDS):</span>
                <span className="font-semibold text-slate-900 block flex items-center gap-1.5">
                  <ChefHat className="h-3.5 w-3.5 text-amber-700" />
                  {currentStage.simulatedData.kdsStatus}
                </span>
              </div>
            </div>

            {/* Recipe BOM Status */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3.5 space-y-1 text-xs">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-amber-700" />
                <span>Recipe Bill of Materials (BOM) Depletion:</span>
              </div>
              <p className="text-slate-700">{currentStage.simulatedData.recipeBOM}</p>
            </div>
          </div>

          {/* Right Operational Benefit Sidecar */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 flex flex-col justify-between text-xs">
            <div className="space-y-3">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-700" />
                <span>Operational Mechanism</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{currentStage.operationalDetail}</p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  <span>Restaurant Margin Benefit</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{currentStage.businessBenefit}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Button asChild size="sm" className="w-full bg-amber-700 hover:bg-amber-800 text-white">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="product_section"
                  productName="hanva_restaurant_pos"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/restaurant-pos/"
                >
                  <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                  <span>Request Live POS Walkthrough</span>
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
