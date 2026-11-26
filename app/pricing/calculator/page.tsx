"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare, HelpCircle, ShieldCheck, ExternalLink, ArrowRight } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/config";
import { trackConversionEvent } from "@/lib/analytics";

function getVolumeBucket(calls: number): string {
  if (calls <= 10000) return "1k-10k";
  if (calls <= 50000) return "11k-50k";
  return "51k-100k";
}

function getDurationBucket(sec: number): string {
  if (sec <= 45) return "15-45s";
  if (sec <= 90) return "46-90s";
  return "91-180s";
}

function getSeatsBucket(seats: number): string {
  if (seats === 0) return "0";
  if (seats <= 5) return "1-5";
  if (seats <= 15) return "6-15";
  return "16-50";
}

export default function CalculatorPage() {
  const [callCount, setCallCount] = React.useState<number>(10000);
  const [avgDurationSec, setAvgDurationSec] = React.useState<number>(45);
  const [includeCrmSeats, setIncludeCrmSeats] = React.useState<boolean>(true);
  const [agentSeats, setAgentSeats] = React.useState<number>(5);

  const seatCostMonthly = 499; // Historical benchmark: ₹499/seat/mo (SAC 763522)
  const hanvaPulseSec = 15;
  const hanvaRatePerPulse = 0.15; // Historical OBD broadcast benchmark: ₹0.15 per 15s pulse = ₹0.60/min (SAC 998419)
  const standardPulseSec = 60;
  const standardRatePerPulse = 0.6; // Illustrative 60s baseline at equivalent ₹0.60/min

  const startedRef = React.useRef(false);
  const markCalculatorStarted = (controlName: string) => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackConversionEvent("pricing_calculator_start", {
      first_control: controlName,
    });
  };

  const trackCalculationComplete = (triggerType: "proposal_contact_cta" | "quote_whatsapp_cta") => {
    trackConversionEvent("pricing_calculator_complete", {
      trigger_type: triggerType,
      call_volume_bucket: getVolumeBucket(callCount),
      duration_bucket: getDurationBucket(avgDurationSec),
      seats_bucket: getSeatsBucket(includeCrmSeats ? agentSeats : 0),
    });
  };

  const safeCalls = Math.min(100000, Math.max(1000, Number.isFinite(callCount) ? callCount : 1000));
  const safeDuration = Math.min(180, Math.max(15, Number.isFinite(avgDurationSec) ? avgDurationSec : 15));
  const safeSeats = includeCrmSeats
    ? Math.min(50, Math.max(1, Number.isFinite(agentSeats) ? agentSeats : 1))
    : 0;

  // Derived calculations
  const totalMinutes = Math.round((safeCalls * safeDuration) / 60);

  const hanvaPulsesPerCall = Math.ceil(safeDuration / hanvaPulseSec);
  const hanvaVoiceCost = safeCalls * hanvaPulsesPerCall * hanvaRatePerPulse;
  const hanvaSeatCost = safeSeats * seatCostMonthly;
  const hanvaTotalEstimated = Math.round(hanvaVoiceCost + hanvaSeatCost);

  const standardPulsesPerCall = Math.ceil(safeDuration / standardPulseSec);
  const standardVoiceCost = safeCalls * standardPulsesPerCall * standardRatePerPulse;
  const standardTotalEstimated = Math.round(standardVoiceCost + hanvaSeatCost);

  const voiceDelta = Math.round(standardVoiceCost - hanvaVoiceCost);
  const percentageVoiceDiff = standardVoiceCost > 0 ? Math.round((voiceDelta / standardVoiceCost) * 100) : 0;

  const whatsappQuery = `Hello Hanva Team, I ran a simulation in your Cost Calculator (${
    includeCrmSeats ? `OBD + ${safeSeats} CRM seat benchmarks` : "OBD Voice Broadcast Only"
  }, ${safeCalls.toLocaleString()} calls/mo @ avg ${safeDuration}s duration, illustrative total ~₹${hanvaTotalEstimated.toLocaleString()}/mo + GST). Please share a formal customized quotation.`;
  const whatsappUrl = `${CONTACT_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(whatsappQuery)}`;

  const contactProposalHref = `/company/contact/?product=auto-dialer&calcCalls=${safeCalls}&calcDur=${safeDuration}&calcSeats=${safeSeats}&calcMode=${
    includeCrmSeats ? "telecalling" : "obd"
  }`;

  return (
    <div className="pt-10 pb-28 lg:py-16 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="live" className="mb-3">
            Interactive Commercial Simulation
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            OBD Voice Pulse &amp; CRM Benchmark Simulator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Compare the mathematical effect of a 15-second outbound broadcast (OBD) pulse versus 60-second rounding using historical invoice benchmarks, with an option to include illustrative CRM seat licenses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">1. Call Volume &amp; Seat Parameters</CardTitle>
                <CardDescription className="text-slate-600">
                  Adjust sliders or enter exact values to simulate outbound broadcast pulse metering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                {/* Total Monthly Calls */}
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <label htmlFor="total-calls-slider" className="font-medium text-slate-800">
                      Total Monthly OBD Calls
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="total-calls-number"
                        aria-label="Enter exact Total Monthly OBD Calls"
                        type="number"
                        min={1000}
                        max={100000}
                        step={500}
                        value={callCount}
                        onChange={(e) => {
                          markCalculatorStarted("call_count");
                          setCallCount(Number(e.target.value));
                        }}
                        className="w-24 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-right font-mono text-xs font-bold text-blue-700 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      />
                      <span className="text-xs text-slate-600">calls</span>
                    </div>
                  </div>
                  <div className="py-2">
                    <input
                      id="total-calls-slider"
                      aria-valuemin={1000}
                      aria-valuemax={100000}
                      aria-valuenow={safeCalls}
                      aria-valuetext={`${safeCalls.toLocaleString()} calls`}
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={safeCalls}
                      onChange={(e) => {
                        markCalculatorStarted("call_count");
                        setCallCount(Number(e.target.value));
                      }}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                    <span>1,000</span>
                    <span>50,000</span>
                    <span>100,000</span>
                  </div>
                </div>

                {/* Average Call Duration */}
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <label htmlFor="call-duration-slider" className="font-medium text-slate-800">
                      Average Call Duration (Seconds)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id="call-duration-number"
                        aria-label="Enter exact Average Call Duration in Seconds"
                        type="number"
                        min={15}
                        max={180}
                        step={5}
                        value={avgDurationSec}
                        onChange={(e) => {
                          markCalculatorStarted("avg_duration");
                          setAvgDurationSec(Number(e.target.value));
                        }}
                        className="w-20 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-right font-mono text-xs font-bold text-blue-700 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                      />
                      <span className="text-xs text-slate-600">sec</span>
                    </div>
                  </div>
                  <div className="py-2">
                    <input
                      id="call-duration-slider"
                      aria-valuemin={15}
                      aria-valuemax={180}
                      aria-valuenow={safeDuration}
                      aria-valuetext={`${safeDuration} seconds`}
                      type="range"
                      min="15"
                      max="180"
                      step="5"
                      value={safeDuration}
                      onChange={(e) => {
                        markCalculatorStarted("avg_duration");
                        setAvgDurationSec(Number(e.target.value));
                      }}
                      className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                    <span>15s (Short OBD alert)</span>
                    <span>45s (Typical broadcast)</span>
                    <span>180s (Long message)</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Total Connected Volume: <strong className="text-slate-900">{totalMinutes.toLocaleString()} minutes</strong> ({hanvaPulsesPerCall} x 15s pulses per call)
                  </p>
                </div>

                {/* CRM Seat Toggle & Slider */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-medium text-slate-800 block">
                        Include CRM Seat Benchmark?
                      </span>
                      <span className="text-[11px] text-slate-600">
                        Adds historical ₹{seatCostMonthly}/user/mo licensing benchmark alongside OBD voice.
                      </span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={includeCrmSeats}
                      onClick={() => {
                        markCalculatorStarted("crm_toggle");
                        setIncludeCrmSeats((prev) => !prev);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        includeCrmSeats
                          ? "bg-blue-50 border-blue-300 text-blue-800"
                          : "bg-slate-100 border-slate-300 text-slate-700"
                      }`}
                    >
                      {includeCrmSeats ? "CRM Seats Included" : "OBD Voice Only"}
                    </button>
                  </div>

                  {includeCrmSeats && (
                    <div>
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <label htmlFor="agent-seats-slider" className="font-medium text-slate-800">
                            Calling Agent CRM Seats
                          </label>
                          <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded font-mono">
                            ₹{seatCostMonthly}/seat benchmark
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            id="agent-seats-number"
                            aria-label="Enter exact Calling Agent CRM Seats"
                            type="number"
                            min={1}
                            max={50}
                            step={1}
                            value={agentSeats}
                            onChange={(e) => {
                              markCalculatorStarted("agent_seats");
                              setAgentSeats(Number(e.target.value));
                            }}
                            className="w-16 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-right font-mono text-xs font-bold text-blue-700 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                          />
                          <span className="text-xs text-slate-600">seats</span>
                        </div>
                      </div>
                      <div className="py-2">
                        <input
                          id="agent-seats-slider"
                          aria-valuemin={1}
                          aria-valuemax={50}
                          aria-valuenow={safeSeats}
                          aria-valuetext={`${safeSeats} CRM seats`}
                          type="range"
                          min="1"
                          max="50"
                          step="1"
                          value={safeSeats}
                          onChange={(e) => {
                            markCalculatorStarted("agent_seats");
                            setAgentSeats(Number(e.target.value));
                          }}
                          className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                        <span>1 seat</span>
                        <span>25 seats</span>
                        <span>50 seats</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Mobile Immediate Preview Bar (visible on < lg so users don't scroll past legal text first) */}
            <div className="lg:hidden rounded-xl border border-blue-300 bg-slate-900 text-white p-4 space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-300 font-semibold uppercase tracking-wider">Illustrative Estimate</span>
                <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded">OBD Pulse Model</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-bold">~₹{hanvaTotalEstimated.toLocaleString()}/mo</span>
                <span className="text-[11px] text-slate-300">+ 18% GST · Quote Required</span>
              </div>
            </div>

            {/* Formula Explanation Card */}
            <Card className="bg-white border-slate-200 text-xs text-slate-700 space-y-2 p-5">
              <div className="font-semibold text-slate-900 text-sm mb-1 flex items-center">
                <HelpCircle className="h-4 w-4 text-blue-600 mr-1.5" aria-hidden="true" />
                <span>How Pulse Metering Works</span>
              </div>
              <p>
                <strong>15s OBD Pulse Benchmark:</strong> Billed in 15-second increments at ₹0.15/pulse (₹0.60/min base). A {safeDuration}-second call consumes {hanvaPulsesPerCall} pulses (₹{(hanvaPulsesPerCall * hanvaRatePerPulse).toFixed(2)}).
              </p>
              <p>
                <strong>Illustrative 60s Pulse Baseline:</strong> Billed in 60-second increments at ₹0.60/pulse. A {safeDuration}-second call consumes {standardPulsesPerCall} {standardPulsesPerCall === 1 ? "pulse" : "pulses"} (₹{(standardPulsesPerCall * standardRatePerPulse).toFixed(2)}).
              </p>
              <p className="text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                *Both comparison columns normalize to ₹0.60/min solely to isolate pulse rounding mechanics. Competitor rates, commitments, and interactive calling tariffs vary.
              </p>
            </Card>

            {/* Commercial Transparency Disclaimer */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-950 space-y-1.5">
              <div className="font-semibold flex items-center text-amber-950">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-700 mr-1.5 shrink-0" aria-hidden="true" />
                <span>Commercial Transparency &amp; Tariff Governance</span>
              </div>
              <p>
                <strong>1. Historical Billing Benchmark Only:</strong> The ₹0.15/15s pulse (= ₹0.60/min) is an OBD-specific historical benchmark (SAC 998419) and ₹499/seat/mo (SAC 763522) is a historical licensing benchmark. Neither is a universal offer or applicable to inbound IVR, two-legged mobile forwarding, interactive agent dialing, or 1800 toll-free traffic.
              </p>
              <p>
                <strong>2. Formal Quotation Mandatory:</strong> Hanva issues formal written quotations factoring in DID number rentals, concurrent channel requirements, setup fees, carrier terms (Vi / Tata), statutory DoT KYC, and 18% GST.
              </p>
              <p>
                <strong>3. Excluded Items:</strong> Simulation follows <em>Calls × CEILING(Duration / Pulse) × Rate</em> plus optional CRM seat benchmarks. It excludes one-time DID setup charges, monthly virtual number rentals, WhatsApp BSP template fees, and 18% GST.
              </p>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <Card className="border-blue-200 bg-white shadow-md">
              <CardHeader className="bg-slate-900 text-white rounded-t-xl pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider">
                    OBD Broadcast Simulation
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-200 border border-slate-700 px-2 py-0.5 rounded font-mono">
                    Confirmed Quote Required
                  </span>
                </div>
                <div aria-live="polite" className="pt-1">
                  <CardTitle className="text-2xl text-white">
                    ~₹{hanvaTotalEstimated.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-slate-300">/ month + 18% GST (Est.)</span>
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-xs mt-1">
                    Simulated 15s OBD voice (~₹{Math.round(hanvaVoiceCost).toLocaleString()})
                    {includeCrmSeats
                      ? ` + ${safeSeats} CRM seat benchmarks (₹${hanvaSeatCost.toLocaleString()})`
                      : " (CRM seats excluded)"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Comparison Breakdown */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span>15s OBD Pulse Simulation:</span>
                    <strong className="text-slate-900">~₹{hanvaTotalEstimated.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>60s Rounding Mathematical Baseline:</span>
                    <span>~₹{standardTotalEstimated.toLocaleString()}</span>
                  </div>
                  {voiceDelta > 0 ? (
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-emerald-700 font-semibold">
                      <span>Pulse Rounding Variance (OBD Voice):</span>
                      <span>~₹{voiceDelta.toLocaleString()} ({percentageVoiceDiff}%)</span>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
                      At exact 60-second multiples ({safeDuration}s), 15s and 60s pulses bill the same total duration.
                    </div>
                  )}
                </div>

                {/* Exclusions Checklist */}
                <div className="text-[11px] text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <strong>Not included in estimate:</strong> Virtual DID monthly rentals, one-time setup charges, inbound forwarding legs, interactive agent SIP trunks, WhatsApp fees, and 18% GST.
                </div>

                {/* Post-Calculation CTAs */}
                <div className="space-y-3 pt-1">
                  <Button asChild variant="primary" className="w-full text-center min-h-[46px]">
                    <Link
                    href={contactProposalHref}
                    onClick={() => trackCalculationComplete("proposal_contact_cta")}
                    className="block w-full"
                  >
                      <span>Request Formal Sales Proposal</span>
                      <ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </Button>

                  <div className="space-y-1">
                    <Button asChild variant="whatsapp" className="w-full text-center min-h-[46px]">
                      <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackCalculationComplete("quote_whatsapp_cta");
                        trackConversionEvent("whatsapp_cta_click", {
                          cta_location: "calculator_summary",
                          context_ref: includeCrmSeats ? "obd_plus_crm" : "obd_only",
                        });
                      }}
                      className="block w-full"
                    >
                        <MessageSquare className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Send Simulation via WhatsApp</span>
                        <ExternalLink className="ml-1.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </Button>
                    <p className="text-[10px] text-slate-600 text-center">
                      Opens WhatsApp with your simulated numbers pre-filled. Review and press Send to request a quote.
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed text-center pt-1">
                  Illustrative mathematical comparison only — not a guaranteed discount or universal calling rate. Final commercials require a written Hanva quotation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
