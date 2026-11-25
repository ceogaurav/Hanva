"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MessageSquare, Sparkles, HelpCircle, ArrowRight, Phone, ShieldCheck, FileText } from "lucide-react";

export default function CalculatorPage() {
  // Configurable Inputs
  const [callCount, setCallCount] = React.useState<number>(10000);
  const [avgDurationSec, setAvgDurationSec] = React.useState<number>(45);
  const [agentSeats, setAgentSeats] = React.useState<number>(5);
  const [seatCostMonthly, setSeatCostMonthly] = React.useState<number>(499); // Historical benchmark: ₹499/seat/mo
  const hanvaPulseSec = 15;
  const hanvaRatePerPulse = 0.15; // Historical benchmark: ₹0.15 per 15s OBD pulse = ₹0.60/min
  const standardPulseSec = 60;
  const standardRatePerPulse = 0.60; // Illustrative 60s comparison baseline: ₹0.60 per 60s pulse = ₹0.60/min

  // Derived calculations
  const totalMinutes = Math.round((callCount * avgDurationSec) / 60);

  // Hanva 15-second pulse calculation
  const hanvaPulsesPerCall = Math.ceil(avgDurationSec / hanvaPulseSec);
  const hanvaVoiceCost = callCount * hanvaPulsesPerCall * hanvaRatePerPulse;
  const hanvaSeatCost = agentSeats * seatCostMonthly;
  const hanvaTotalEstimated = Math.round(hanvaVoiceCost + hanvaSeatCost);

  // Standard 60-second pulse calculation (using equivalent baseline minute rate)
  const standardPulsesPerCall = Math.ceil(avgDurationSec / standardPulseSec);
  const standardVoiceCost = callCount * standardPulsesPerCall * standardRatePerPulse;
  const standardSeatCost = agentSeats * seatCostMonthly;
  const standardTotalEstimated = Math.round(standardVoiceCost + standardSeatCost);

  // Delta
  const voiceDelta = Math.round(standardVoiceCost - hanvaVoiceCost);
  const percentageVoiceDiff = standardVoiceCost > 0 ? Math.round((voiceDelta / standardVoiceCost) * 100) : 0;

  // WhatsApp Pre-filled text URL encoded
  const whatsappQuery = `Hello Hanva Team, I used your pulse calculator for ${callCount.toLocaleString()} calls at avg ${avgDurationSec}s duration with ${agentSeats} agents. I would like a formal quotation.`;
  const whatsappUrl = `https://wa.me/918423711043?text=${encodeURIComponent(whatsappQuery)}`;

  return (
    <div className="py-12 lg:py-16 bg-slate-50 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="live" className="mb-3">
            Interactive Commercial Simulation
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Transparent Voice Pulse & CRM Cost Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Simulate your monthly voice communication and CRM costs. Compare the mathematical difference between an efficient 15-second OBD billing pulse and standard 60-second retail billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">1. Call Volume & Duration Parameters</CardTitle>
                <CardDescription>
                  Adjust parameters to match your current team&apos;s outbound call volume.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                {/* Total Monthly Calls Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="total-calls-slider" className="font-medium text-slate-700">Total Monthly Calls</label>
                    <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {callCount.toLocaleString()} calls
                    </span>
                  </div>
                  <input
                    id="total-calls-slider"
                    aria-label="Total Monthly Outbound Calls"
                    aria-valuemin={1000}
                    aria-valuemax={100000}
                    aria-valuenow={callCount}
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={callCount}
                    onChange={(e) => setCallCount(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1,000</span>
                    <span>50,000</span>
                    <span>100,000</span>
                  </div>
                </div>

                {/* Average Call Duration */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="call-duration-slider" className="font-medium text-slate-700">Average Call Duration (Seconds)</label>
                    <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {avgDurationSec} seconds
                    </span>
                  </div>
                  <input
                    id="call-duration-slider"
                    aria-label="Average Call Duration in Seconds"
                    aria-valuemin={15}
                    aria-valuemax={180}
                    aria-valuenow={avgDurationSec}
                    type="range"
                    min="15"
                    max="180"
                    step="5"
                    value={avgDurationSec}
                    onChange={(e) => setAvgDurationSec(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>15s (Short alert)</span>
                    <span>45s (Typical pitch)</span>
                    <span>180s (Detailed consultation)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Total Estimated Duration: <strong>{totalMinutes.toLocaleString()} minutes</strong>
                  </p>
                </div>

                {/* Agent Seats */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <label htmlFor="agent-seats-slider" className="font-medium text-slate-700">Calling Agent CRM Seats</label>
                      <span className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-mono">
                        Historical Benchmark (Illustrative)
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {agentSeats} seats (@ ₹{seatCostMonthly}/user/mo illustrative benchmark)
                    </span>
                  </div>
                  <input
                    id="agent-seats-slider"
                    aria-label="Number of CRM Calling Agent Seats"
                    aria-valuemin={1}
                    aria-valuemax={50}
                    aria-valuenow={agentSeats}
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={agentSeats}
                    onChange={(e) => setAgentSeats(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1 seat</span>
                    <span>25 seats</span>
                    <span>50 seats</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formula Explanation Card */}
            <Card className="bg-white border-slate-200 text-xs text-slate-600 space-y-2 p-5">
              <div className="font-semibold text-slate-800 text-sm mb-1 flex items-center">
                <HelpCircle className="h-4 w-4 text-blue-600 mr-1.5" />
                How Pulse Metering Works
              </div>
              <p>
                <strong>Hanva 15s Pulse:</strong> Billed in 15-second increments. A {avgDurationSec}-second call requires {hanvaPulsesPerCall} pulses (cost: ₹{(hanvaPulsesPerCall * hanvaRatePerPulse).toFixed(2)}).
              </p>
              <p>
                <strong>Standard 60s Pulse:</strong> Billed in 60-second increments. A {avgDurationSec}-second call requires {standardPulsesPerCall} pulse (cost: ₹{(standardPulsesPerCall * standardRatePerPulse).toFixed(2)}).
              </p>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                *Note: Both models assume an equivalent base rate of ₹0.60 per minute for objective mathematical comparison. Competitor tariffs, pulses, and minimum commitments vary across providers. This comparison is strictly an illustrative mathematical model, not a universal competitor tariff.
              </p>
            </Card>

            {/* Commercial Transparency Disclaimer */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-amber-900 space-y-1.5">
              <div className="font-semibold flex items-center text-amber-950">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-700 mr-1.5 shrink-0" />
                Commercial Transparency & Tariff Governance
              </div>
              <p>
                <strong>1. Historical Billing Benchmark:</strong> The outbound 15-second pulse (₹0.15/pulse = ₹0.60/min) and CRM seat rate (₹499/seat/mo) reflect historical illustrative billing benchmarks derived from a specific outbound OBD voice broadcast invoice (SAC 998419) and user licensing (SAC 763522). This rate does not represent a current universal tariff or offer and applies specifically to outbound broadcast campaigns, not to standard inbound IVR, conversational telecalling, or toll-free services.
              </p>
              <p>
                <strong>2. Illustrative Modeling:</strong> Both comparison models assume an identical normalized base rate of ₹0.60/min to mathematically demonstrate the efficiency of smaller pulse increments. Competitor tariffs vary by provider.
              </p>
              <p>
                <strong>3. Formal Quotation Mandatory:</strong> Hanva does not publish fixed retail tariffs. Commercial agreements are established solely via formal written proposals detailing approved tariffs, required DID series (Vi / Tata), concurrent channel commitments, setup fees, applicable carrier surcharges, and statutory DoT KYC verification. All charges are exclusive of 18% GST.
              </p>
              <p>
                <strong>4. Scope of Calculation:</strong> This simulation calculates estimated outbound voice pulse charges using the formula: <em>Calls × CEILING(Average Duration / Pulse) × Rate per Pulse</em>. It does not include one-time DID setup fees, monthly number rentals, carrier interconnect charges, or messaging surcharges.
              </p>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-blue-200 bg-white shadow-md">
              <CardHeader className="bg-slate-900 text-white rounded-t-xl pb-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                    Illustrative Simulation
                  </div>
                  <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">
                    Quote Required
                  </span>
                </div>
                <CardTitle className="text-2xl text-white">
                  ~₹{hanvaTotalEstimated.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-slate-400">/ month + GST (Est.)</span>
                </CardTitle>
                <CardDescription className="text-slate-300 text-xs">
                  Simulated 15s voice usage (~₹{Math.round(hanvaVoiceCost).toLocaleString()}) + benchmarked CRM licenses (₹{hanvaSeatCost.toLocaleString()})
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* Comparison Card */}
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Simulated Model (15s Pulse + CRM):</span>
                    <strong className="text-slate-900">~₹{hanvaTotalEstimated.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Illustrative 60s Pulse Baseline:</span>
                    <span>~₹{standardTotalEstimated.toLocaleString()}</span>
                  </div>
                  {voiceDelta > 0 && (
                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-emerald-700 font-semibold">
                      <span>Illustrative Pulse Rounding Variance:</span>
                      <span>~₹{voiceDelta.toLocaleString()} ({percentageVoiceDiff}%)</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="whatsapp" className="w-full text-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Get Quotation via WhatsApp
                    </Button>
                  </a>

                  <Link href="/company/contact/" className="block">
                    <Button variant="primary" className="w-full text-center">
                      Request Formal Sales Proposal
                    </Button>
                  </Link>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed text-center pt-2">
                  This illustration demonstrates the mathematical effect of different billing intervals using assumed rates. It does not represent a competitor tariff, guaranteed saving, or universal Hanva calling rate. Actual billing depends on the applicable service, approved proposal, carrier terms, billing configuration and taxes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
