"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-links";
import { buildSaasDemoWhatsAppUrl } from "@/lib/config";
import { trackProductDemoInteraction } from "@/lib/analytics";
import {
  Scissors,
  Package,
  MessageSquare,
  ExternalLink,
  Sparkles,
  BarChart3,
} from "lucide-react";

interface SalonStage {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  salonRole: string;
  simulatedData: {
    client: string;
    stylist: string;
    services: string[];
    subtotal: number;
    gstAmount: number;
    totalAmount: number;
    paymentSplit: string;
    stylistCommission: number;
    consumableDeducted: string;
  };
  operationalDetail: string;
  businessBenefit: string;
}

const SALON_STAGES: SalonStage[] = [
  {
    id: "appointment",
    stepNumber: "01",
    title: "1. Client Booking & Waitlist",
    subtitle: "Client schedules appointment via public mini-site link or front desk logs walk-in.",
    salonRole: "Front Desk & Reception",
    simulatedData: {
      client: "Ananya Iyer (Visit #4)",
      stylist: "Kavita R. (Master Stylist)",
      services: ["Keratin Hair Spa", "Haircut & Blow-Dry"],
      subtotal: 2400,
      gstAmount: 432,
      totalAmount: 2832,
      paymentSplit: "Pending Checkout",
      stylistCommission: 360,
      consumableDeducted: "Queued for billing",
    },
    operationalDetail: "Stylist timeline calendar blocks chair from 3:00 PM to 4:15 PM with zero double-booking.",
    businessBenefit: "Eliminates weekend front-desk booking gridlocks and customer wait-time walkouts.",
  },
  {
    id: "service_delivery",
    stepNumber: "02",
    title: "2. Service Delivery & Stylist PIN Portal",
    subtitle: "Stylist checks service notes and client past preferences on their mobile staff portal.",
    salonRole: "Stylist / Therapist",
    simulatedData: {
      client: "Ananya Iyer",
      stylist: "Kavita R. (PIN: ****)",
      services: ["Keratin Hair Spa (60m)", "Haircut & Blow-Dry (30m)"],
      subtotal: 2400,
      gstAmount: 432,
      totalAmount: 2832,
      paymentSplit: "Service In-Progress",
      stylistCommission: 360,
      consumableDeducted: "50ml Keratin Infusion + 1 Disposables Kit",
    },
    operationalDetail: "Stylist reviews past treatment notes and recommends customized scalp care treatment.",
    businessBenefit: "Empowers stylists to deliver personalized service without asking clients repeat questions.",
  },
  {
    id: "auto_consumption",
    stepNumber: "03",
    title: "3. Back-Bar Auto-Consumption",
    subtitle: "System links treatments to recipes, automatically deducting exact consumables.",
    salonRole: "Inventory Manager / Floor Supervisor",
    simulatedData: {
      client: "Ananya Iyer",
      stylist: "Kavita R.",
      services: ["Keratin Hair Spa"],
      subtotal: 2400,
      gstAmount: 432,
      totalAmount: 2832,
      paymentSplit: "Inventory Linked",
      stylistCommission: 360,
      consumableDeducted: "Deducted: 50ml Keratin Serum (Stock: 450ml remaining)",
    },
    operationalDetail: "Recipe binding deducts professional back-bar product automatically—no manual stock ledger.",
    businessBenefit: "Stops untracked product leakage of expensive hair colors, serums, and facial kits.",
  },
  {
    id: "gst_billing",
    stepNumber: "04",
    title: "4. Rapid GST POS Checkout",
    subtitle: "Front desk issues SAC 9997 compliant GST bill with split tax line items.",
    salonRole: "Cashier / Front Desk",
    simulatedData: {
      client: "Ananya Iyer",
      stylist: "Kavita R.",
      services: ["Keratin Hair Spa (₹1,600)", "Haircut (₹800)"],
      subtotal: 2400,
      gstAmount: 432,
      totalAmount: 2832,
      paymentSplit: "₹1,000 Cash + ₹1,832 UPI QR",
      stylistCommission: 360,
      consumableDeducted: "Confirmed Deducted",
    },
    operationalDetail: "18% GST (9% CGST ₹216 + 9% SGST ₹216) calculated instantly with thermal receipt print.",
    businessBenefit: "100% compliant Indian tax invoicing with zero cashier calculation delays.",
  },
  {
    id: "split_payment",
    stepNumber: "05",
    title: "5. Split Tender & Dynamic UPI QR",
    subtitle: "Client splits payment across Cash and dynamic UPI QR code with digital WhatsApp receipt.",
    salonRole: "Front Desk & Client",
    simulatedData: {
      client: "Ananya Iyer",
      stylist: "Kavita R.",
      services: ["Keratin Hair Spa", "Haircut"],
      subtotal: 2400,
      gstAmount: 432,
      totalAmount: 2832,
      paymentSplit: "Split Paid: Cash ₹1,000 • UPI ₹1,832 (NPCI UPI Intent Verified)",
      stylistCommission: 360,
      consumableDeducted: "Inventory Ledger Closed",
    },
    operationalDetail: "Customer scans dynamic UPI QR printed on thermal bill via Google Pay, PhonePe, or Paytm.",
    businessBenefit: "Speeds up checkout counter settlement by 60% compared to traditional card POS machines.",
  },
  {
    id: "commission_closing",
    stepNumber: "06",
    title: "6. Staff Commission & Evening Z-Report",
    subtitle: "Stylist personal ledger updates and salon manager runs evening cash register Z-report.",
    salonRole: "Salon Owner / Manager",
    simulatedData: {
      client: "Ananya Iyer",
      stylist: "Kavita R. (Daily Earnings: ₹1,480)",
      services: ["Keratin Hair Spa", "Haircut"],
      subtotal: 2400,
      gstAmount: 432,
      totalAmount: 2832,
      paymentSplit: "Settled & Drawer Reconciled",
      stylistCommission: 360, // 15% of ₹2,400
      consumableDeducted: "Daily Consumption Summary Generated",
    },
    operationalDetail: "Kavita R. earns 15% service commission (₹360). Manager closes cash drawer with matched Z-Report.",
    businessBenefit: "Zero end-of-month stylist commission disputes and 100% cash reconciliation transparency.",
  },
];

export function SalonWorkflowExplorer() {
  const [activeStageIndex, setActiveStageIndex] = React.useState(0);
  const currentStage = SALON_STAGES[activeStageIndex];
  const whatsappUrl = buildSaasDemoWhatsAppUrl("salon");

  const handleStageSelect = (idx: number) => {
    setActiveStageIndex(idx);
    trackProductDemoInteraction("hanva_salon_software", SALON_STAGES[idx].id, "stage_click");
  };

  return (
    <div className="rounded-2xl border border-rose-200 bg-white shadow-xs overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-900 to-slate-900 text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-rose-500/20 text-rose-200 border-rose-400/30 text-xs">
              Interactive Educational Simulation
            </Badge>
            <span className="text-xs text-slate-400 font-mono">Educational Concept • Synthetic Salon Data</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Hanva Salon Software — Booking to Billing &amp; Commission Lifecycle
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Follow the 6 stages of daily salon operations: online appointment, service delivery, auto-consumption, GST checkout, and staff commission.
          </p>
          <p className="text-[11px] text-rose-200/80 italic pt-0.5">
            Note: This interactive educational simulation demonstrates daily salon workflows using synthetic non-PII data. It is not connected to a live salon terminal.
          </p>
        </div>

        <Badge variant="outline" className="text-xs font-mono self-start md:self-auto bg-slate-800 text-rose-300 border-rose-500/40">
          Role: {currentStage.salonRole}
        </Badge>
      </div>

      {/* Stage Tabs Navigation */}
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {SALON_STAGES.map((stg, idx) => {
            const isActive = idx === activeStageIndex;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => handleStageSelect(idx)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-rose-700 shadow-xs border border-rose-200 font-bold"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? "bg-rose-600 text-white" : "bg-slate-200 text-slate-700"
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

      {/* Main Interactive Stage Body */}
      <div className="p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-rose-600">
              Stage {currentStage.stepNumber} of 06
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">{currentStage.title}</h4>
            <p className="text-xs sm:text-sm text-slate-600">{currentStage.subtitle}</p>
          </div>
          <Badge className="bg-rose-100 text-rose-800 border-rose-200 text-xs self-start sm:self-auto">
            {currentStage.salonRole}
          </Badge>
        </div>

        {/* Live Simulation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Visual Ticket Box */}
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
              <div className="space-y-0.5">
                <div className="text-xs text-slate-500 font-mono">Invoice Ticket: #INV-SLN-1049</div>
                <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Scissors className="h-4 w-4 text-rose-600" />
                  <span>{currentStage.simulatedData.client}</span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-white text-slate-800">
                Stylist: {currentStage.simulatedData.stylist}
              </Badge>
            </div>

            {/* Service & Tax Line Items */}
            <div className="rounded-lg bg-white p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex justify-between">
                <span>Billed Services &amp; SAC Codes</span>
                <span>Amount (INR)</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Keratin Hair Spa (SAC 9997)</span>
                <span className="font-mono">₹1,600.00</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Stylist Haircut &amp; Blow-Dry (SAC 9997)</span>
                <span className="font-mono">₹800.00</span>
              </div>
              <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-100">
                <span>Subtotal (Net Service Value)</span>
                <span className="font-mono">₹{currentStage.simulatedData.subtotal}.00</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>India GST (18%: 9% CGST + 9% SGST)</span>
                <span className="font-mono">₹{currentStage.simulatedData.gstAmount}.00</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-1.5 border-t border-slate-200">
                <span>Total Bill Amount</span>
                <span className="font-mono text-rose-700">₹{currentStage.simulatedData.totalAmount}.00</span>
              </div>
            </div>

            {/* Split Tender & Stock State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium block">Tender Settlement:</span>
                <span className="font-semibold text-slate-900 block">{currentStage.simulatedData.paymentSplit}</span>
              </div>
              <div className="rounded-lg bg-white p-3 border border-slate-200 space-y-1">
                <span className="text-slate-500 font-medium block">Stylist Commission Earned:</span>
                <span className="font-bold text-emerald-700 block">
                  ₹{currentStage.simulatedData.stylistCommission}.00 (15% Net Slab)
                </span>
              </div>
            </div>

            {/* Back-bar Consumption Card */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-3.5 space-y-1 text-xs">
              <div className="font-bold text-rose-900 flex items-center gap-1.5">
                <Package className="h-4 w-4 text-rose-600" />
                <span>Auto-Consumption Recipe Status:</span>
              </div>
              <p className="text-slate-700">{currentStage.simulatedData.consumableDeducted}</p>
            </div>
          </div>

          {/* Right Explanatory Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 flex flex-col justify-between text-xs">
            <div className="space-y-3">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-rose-600" />
                <span>Operational Mechanism</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{currentStage.operationalDetail}</p>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                  <span>Salon Business Value</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{currentStage.businessBenefit}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Button asChild size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  ctaLocation="product_section"
                  productName="hanva_salon_software"
                  ctaType="product_demo_whatsapp"
                  contextRef="/products/salon-software/"
                >
                  <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
                  <span>Request Salon Walkthrough</span>
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
