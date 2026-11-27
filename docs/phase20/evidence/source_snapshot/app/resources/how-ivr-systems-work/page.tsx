import * as React from "react";
import Link from "next/link";
import { ArticleLayout } from "@/components/shared/article-layout";
import { Table, TableBody, TableCell,
  TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PhoneCall, GitBranch, Cpu, Headphones, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "How Does IVR Work? Multi-Level Call Routing Guide",
  description:
    "A deep technical dive into Interactive Voice Response (IVR) architecture: DTMF frequency detection, multi-level call tree design, skill-based ACD, and CRM webhook routing.",
  alternates: {
    canonical: "https://www.hanva.in/resources/how-ivr-systems-work/",
  },
  openGraph: {
    title: "How Does IVR Work? Multi-Level Call Routing Guide",
    description:
      "A deep dive into multi-level interactive voice response: DTMF tone detection, speech synthesis, skill-based queue distribution, and webhook CRM synchronization.",
    url: "https://www.hanva.in/resources/how-ivr-systems-work/",
    siteName: "Hanva Technologies",
    locale: "en_IN",
    type: "article",
    images: [{ url: "https://www.hanva.in/og-image.png", width: 1200, height: 630, alt: "How IVR Systems Work Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Does IVR Work? Multi-Level Call Routing Guide | Hanva Technologies",
    description: "A deep technical dive into Interactive Voice Response (IVR) architecture: DTMF frequency detection, multi-level call tree design, skill-based ACD, and CRM webhook routing.",
    images: ["https://www.hanva.in/og-image.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Does an IVR System Work? Architecture, DTMF Logic & Routing Workflows",
  description:
    "An engineering and operational exploration of Interactive Voice Response (IVR) systems, DTMF signaling, automated call distribution, and cloud CRM integration.",
  author: {
    "@type": "Organization",
    name: "Hanva Engineering & Editorial Board",
    url: "https://www.hanva.in/company/about/",
  },
  publisher: {
    "@type": "Organization",
    name: "Hanva Technologies Private Limited",
    url: "https://www.hanva.in",
    logo: {
      "@type": "ImageObject",
      url: "https://www.hanva.in/icon.png",
    },
  },
  datePublished: "2026-11-25",
  dateModified: "2026-11-25",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://www.hanva.in/resources/how-ivr-systems-work/",
  },
};

const faqs = [
  {
    question: "What is the technical difference between Single-Level and Multi-Level IVR?",
    answer:
      "A Single-Level IVR offers a direct one-step menu (e.g., 'Press 1 for Sales, Press 2 for Support'). A Multi-Level IVR creates hierarchical nested trees. For instance, selecting 'Press 1 for Sales' can branch to a sub-menu asking 'Press 1 for Commercial Real Estate, Press 2 for Residential Villas', or route callers to specific language queues (English, Hindi, Kannada, Tamil) before connecting to an agent.",
  },
  {
    question: "How does the system detect keypresses during a phone call?",
    answer:
      "IVR systems utilize Dual-Tone Multi-Frequency (DTMF) signaling. When a caller taps a number on their dialpad, the phone transmits two simultaneous sinusoidal sound frequencies (e.g., key '1' produces 697 Hz and 1209 Hz). Telecom gateways and Session Border Controllers (SBC) translate these acoustic frequencies into digital events according to RFC 4733 / RFC 2833 standards, instructing the IVR application to trigger the matching routing logic.",
  },
  {
    question: "Can an IVR look up customer records in a CRM before routing the call?",
    answer:
      "Yes. Modern cloud IVRs support real-time HTTP REST webhook lookups. When an incoming call connects, the IVR captures the caller's phone number (CLI) and queries the enterprise CRM database. If the caller is identified as an existing customer with an open ticket, the IVR can immediately route them directly to their dedicated relationship manager, bypassing general inquiry queues.",
  },
  {
    question: "What happens if a caller does not press any key or presses an invalid number?",
    answer:
      "Production IVR flows include configured timeout and error retry thresholds. If no DTMF input is received within 5 to 7 seconds, the IVR replays the menu prompt once. If input fails again, the call routes to a default operator ring group or triggers an automated voicemail/callback capture.",
  },
  {
    question: "Can IVRs trigger automated messages to customers after a call ends?",
    answer:
      "Yes. Upon call completion or disconnection, the IVR system emits an event webhook containing call metrics (duration, caller ID, IVR branch selected). This webhook can automatically trigger a WhatsApp Business API message or SMS containing booking confirmations, office location maps, or feedback surveys.",
  },
];

export default function HowIvrSystemsWorkPage() {
  return (
    <ArticleLayout
      pillarBadge="Pillar A: Cloud Telephony & IVR"
      pillarHref="/resources/"
      title="How Does an IVR System Work? Call Flows, DTMF & CRM Routing Explained"
      subtitle="From dual-tone frequency processing to multi-level menu trees, skill-based ACD queues, and real-time CRM webhooks: the engineering blueprint behind enterprise voice automation."
      readTime="9 min read"
      publishDate="November 25, 2026"
      reviewDate="November 2026"
      editorialAttribution="Hanva Engineering & Editorial Board"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resources", href: "/resources/" },
        { label: "How Does IVR Work?" },
      ]}
      whatsappRef="/resources/how-ivr-systems-work/"
      executiveSummary="An Interactive Voice Response (IVR) system is a software-driven telephony application that interacts with callers, gathers information through touch-tone keypad inputs (DTMF) or speech, and routes calls to appropriate destinations based on business rules. Modern cloud IVRs connect directly to CRM databases via REST webhooks, enabling personalized routing, automated self-service transactions, after-hours voicemails, and omnichannel post-call workflows."
      tableOfContents={[
        { id: "signal-processing", title: "1. The Mechanics of DTMF Signal Processing" },
        { id: "ivr-architecture", title: "2. The 4-Layer Cloud IVR Stack" },
        { id: "call-flow-design", title: "3. Designing Effective Multi-Level Call Trees" },
        { id: "crm-integration", title: "4. Webhook CRM Integrations & Screen-Pops" },
        { id: "routing-algorithms", title: "5. Automatic Call Distribution (ACD) Methods" },
        { id: "faqs", title: "6. Frequently Asked Questions" },
      ]}
      relatedProducts={[
        {
          title: "Smart IVR Systems",
          description: "Multi-level menus, time-based routing, and real-time CRM webhook integration.",
          href: "/products/smart-ivr/",
        },
        {
          title: "Cloud Telephony",
          description: "Enterprise voice infrastructure with virtual numbers, call distribution, and analytics.",
          href: "/products/cloud-telephony/",
        },
        {
          title: "Call Center Software",
          description: "Intelligent queue management, live supervisor monitoring, and performance analytics.",
          href: "/products/call-center-software/",
        },
      ]}
      relatedIndustries={[
        {
          title: "Healthcare",
          description: "Multi-language patient appointment IVRs, OPD scheduling, and emergency lines.",
          href: "/industry/healthcare/",
        },
        {
          title: "Real Estate",
          description: "Centralized project inquiry routing, broker screening, and floor plan dispatch.",
          href: "/industry/real-estate/",
        },
        {
          title: "Financial Services",
          description: "Automated account balance queries, loan application routing, and fraud verification.",
          href: "/industry/financial-services/",
        },
      ]}
      faqs={faqs}
      schemaData={articleSchema}
    >
      {/* SECTION 1 */}
      <section id="signal-processing" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="h-6 w-6 text-blue-600" />
          1. The Mechanics of DTMF Signal Processing
        </h2>
        <p>
          At the core of touch-tone IVR interaction lies <strong>Dual-Tone Multi-Frequency (DTMF)</strong> signaling. Developed by Bell System engineers in the 1960s, DTMF assigns two simultaneous acoustic frequencies to every digit on a telephone keypad: one from a lower frequency group (697–941 Hz) and one from a higher frequency group (1209–1633 Hz).
        </p>

        <div className="overflow-x-auto my-6 border border-slate-200 rounded-xl">
          <Table>
            <TableCaption className="sr-only">Technical and commercial comparison table</TableCaption>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead scope="col" className="font-bold text-slate-900">Keypad Digit</TableHead>
                <TableHead scope="col" className="font-bold text-slate-900">Low Frequency (Row)</TableHead>
                <TableHead scope="col" className="font-bold text-slate-900">High Frequency (Column)</TableHead>
                <TableHead scope="col" className="font-bold text-slate-900">RFC 4733 Payload Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              <TableRow>
                <th scope="row" className="font-bold text-blue-600">Digit 1</th>
                <TableCell>697 Hz</TableCell>
                <TableCell>1209 Hz</TableCell>
                <TableCell className="font-mono text-slate-600">Event 1 (Duration ~160ms)</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-bold text-blue-600">Digit 2</th>
                <TableCell>697 Hz</TableCell>
                <TableCell>1336 Hz</TableCell>
                <TableCell className="font-mono text-slate-600">Event 2 (Duration ~160ms)</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-bold text-blue-600">Digit 3</th>
                <TableCell>697 Hz</TableCell>
                <TableCell>1477 Hz</TableCell>
                <TableCell className="font-mono text-slate-600">Event 3 (Duration ~160ms)</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-bold text-blue-600">Digit 9</th>
                <TableCell>852 Hz</TableCell>
                <TableCell>1477 Hz</TableCell>
                <TableCell className="font-mono text-slate-600">Event 9 (Duration ~160ms)</TableCell>
              </TableRow>
              <TableRow>
                <th scope="row" className="font-bold text-blue-600">Hash (#)</th>
                <TableCell>941 Hz</TableCell>
                <TableCell>1477 Hz</TableCell>
                <TableCell className="font-mono text-slate-600">Event 11 (End of Input)</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <p>
          In modern VoIP networks, transmitting these audio tones across compressed codecs (such as G.729 or Opus) can degrade the acoustic wave and lead to dropped inputs. Modern Session Border Controllers (SBC) intercept the raw audio tones and convert them into out-of-band <strong>RFC 4733 RTP packets</strong> for reliable digit recognition by cloud IVR software.
        </p>
      </section>

      {/* SECTION 2 */}
      <section id="ivr-architecture" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <GitBranch className="h-6 w-6 text-blue-600" />
          2. The 4-Layer Cloud IVR Stack
        </h2>
        <p>
          A production-grade cloud IVR platform operates across four coordinated technological layers:
        </p>

        <div className="space-y-3 my-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</span>
              Telephony Ingress & Media Server
            </h3>
            <p className="text-xs text-slate-600">
              Connects to carrier PRI/SIP trunks, negotiates media codecs, streams studio-recorded <code>.wav</code> audio greetings (8 kHz, 16-bit Mono PCM), and handles DTMF detection.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</span>
              Dialplan & Execution State Machine
            </h3>
            <p className="text-xs text-slate-600">
              Maintains the caller&apos;s session state. Evaluates time-of-day conditions (Office Hours vs. Night Routing), tracks menu depth, manages timeout counters, and decides whether to branch or connect.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">3</span>
              Application Integration Engine (REST Webhooks)
            </h3>
            <p className="text-xs text-slate-600">
              Queries external APIs and databases via JSON payloads within 200–400 milliseconds. Performs real-time customer lookups, order status verification, or dynamic VIP agent routing.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">4</span>
              Automatic Call Distribution (ACD) Queue Engine
            </h3>
            <p className="text-xs text-slate-600">
              Places callers into priority hold queues with custom hold music, calculates estimated wait times, and distributes ringing calls across available agent softphones.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      <section id="call-flow-design" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          3. Designing Effective Multi-Level Call Trees
        </h2>
        <p>
          Poorly architected IVR menus frustrate customers and lead to high call abandonment. Following proven structural guidelines ensures maximum caller completion rates:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <h3 className="text-base font-bold text-slate-900">Example A: Real Estate Inbound Tree</h3>
            <div className="text-xs text-slate-700 space-y-2 font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p>Incoming Call to +91 80 4XXX XXXX</p>
              <p>├── Greeting: &quot;Welcome to Prestige Realty&quot;</p>
              <p>├── [1] Residential Inquiries</p>
              <p>│   ├── [1] North Bengaluru Projects (Queue A)</p>
              <p>│   └── [2] South Bengaluru Villas (Queue B)</p>
              <p>├── [2] Commercial Leasing (Direct Agent Transfer)</p>
              <p>├── [3] Existing Buyers & Customer Relations</p>
              <p>└── [*] Repeat Menu Options</p>
            </div>
            <p className="text-xs text-slate-500">
              Outcome: Callers reach relevant property specialists in under 20 seconds.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-3">
            <h3 className="text-base font-bold text-slate-900">Example B: Healthcare Clinic OPD Tree</h3>
            <div className="text-xs text-slate-700 space-y-2 font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
              <p>Incoming Call to +91 40 6XXX XXXX</p>
              <p>├── Language Selection:</p>
              <p>│   ├── [1] English</p>
              <p>│   ├── [2] Telugu</p>
              <p>│   └── [3] Hindi</p>
              <p>├── [1] Book or Reschedule Doctor Appointment</p>
              <p>├── [2] Diagnostic & Blood Test Reports</p>
              <p>├── [9] Emergency Casualty Escalation (Bypasses Queue)</p>
              <p>└── After-Hours: Automated Voicemail & WhatsApp Link</p>
            </div>
            <p className="text-xs text-slate-500">
              Outcome: Emergency calls route instantly while routine inquiries are self-serviced.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Golden Rules of IVR Tree Design</h3>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li><strong>Limit Top-Level Options:</strong> Never exceed 4 choices in the primary menu to prevent cognitive overload.</li>
            <li><strong>State the Action Before the Key:</strong> Say <em>&quot;For Sales, press 1&quot;</em> rather than <em>&quot;Press 1 for Sales&quot;</em> so callers absorb the department before preparing to dial.</li>
            <li><strong>Always Offer an Agent Out:</strong> Allow callers to speak with an operator or leave a voicemail if their query does not match menu categories.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 4 */}
      <section id="crm-integration" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Headphones className="h-6 w-6 text-blue-600" />
          4. Webhook CRM Integrations & Screen-Pops
        </h2>
        <p>
          Modern cloud IVRs do not operate in a vacuum. By synchronizing with CRM applications through bidirectional HTTP webhooks, companies eliminate repetitive customer questions:
        </p>

        <div className="space-y-3 my-4">
          <div className="border-l-4 border-blue-500 pl-4 py-1 space-y-1">
            <h3 className="text-sm font-bold text-slate-900">1. Pre-Routing Webhook (Screen-Pop Trigger)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When a call rings on an agent&apos;s softphone, the IVR broadcasts a websocket event containing the caller&apos;s CLI. The agent&apos;s CRM screen immediately opens the caller&apos;s profile, showing past purchase history, previous call recordings, and open support tickets before the agent says hello.
            </p>
          </div>

          <div className="border-l-4 border-emerald-500 pl-4 py-1 space-y-1">
            <h3 className="text-sm font-bold text-slate-900">2. Post-Call Disposition Webhook</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When the conversation concludes, the agent selects a disposition code (e.g., <em>Interested - Site Visit Scheduled</em>). The IVR appends the recording URL and duration to the lead card, triggers an automated WhatsApp confirmation message to the prospect, and schedules a follow-up calendar reminder.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 */}
      <section id="routing-algorithms" className="space-y-4 pt-6 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">
          5. Automatic Call Distribution (ACD) Routing Algorithms
        </h2>
        <p>
          Once an IVR menu branch is selected, the platform&apos;s Automatic Call Distribution (ACD) engine decides which agent receives the call:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-900">Round-Robin Routing</h3>
            <p className="text-slate-600 leading-relaxed">
              Distributes incoming calls sequentially across all available agents in equal rotation, ensuring balanced lead allocation across the team.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-900">Longest Idle Routing</h3>
            <p className="text-slate-600 leading-relaxed">
              Routes the next call to whichever agent has gone the longest time without handling a customer interaction, optimizing staff workload fairness.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 space-y-1">
            <h3 className="font-bold text-slate-900">Sticky Agent Routing</h3>
            <p className="text-slate-600 leading-relaxed">
              Recognizes repeat callers and routes them directly to the exact agent who handled their previous inquiry, preserving relationship continuity.
            </p>
          </div>
        </div>
      </section>
    </ArticleLayout>
  );
}
