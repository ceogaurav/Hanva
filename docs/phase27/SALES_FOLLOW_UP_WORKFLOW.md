# HANVA TECHNOLOGIES — SALES FOLLOW-UP WORKFLOW
## 12-Stage Sales Execution Engine, Response SLAs & Daily Operational Reporting

**Company:** Hanva Technologies Private Limited  
**Website:** https://www.hanva.in  
**Phase:** 27  
**Audience:** Hanva Sales Engineering Desk & Operations Management  
**Date:** November 2026

---

## 1. Sales Workflow Objective

Customer acquisition does not end when a website visitor clicks WhatsApp or submits an enquiry form. In Indian B2B markets, rapid response time and structured follow-up discipline determine whether an enquiry converts into a closed sale or goes cold.

This document establishes the **12-Stage Sales Follow-Up Workflow** for Hanva Technologies, defining clear entry conditions, responsible roles, service-level agreements (SLAs), and daily reporting protocols.

---

## 2. The 12 Standardized Sales Stages

```
┌─────────────────────────────────────────────────────────────┐
│ 1. New Enquiry           → 2. Contact Attempted             │
│        ↓                                                    │
│ 3. Contacted             → 4. Requirement Understood        │
│        ↓                                                    │
│ 5. Qualified             → 6. Demo Requested                │
│        ↓                                                    │
│ 7. Demo Scheduled        → 8. Demo Completed                │
│        ↓                                                    │
│ 9. Proposal / Pricing    → 10. Follow-Up Required           │
│        ↓                                                    │
│ 11. Won (Customer)       OR 12. Lost (Disqualified/Closed)  │
└─────────────────────────────────────────────────────────────┘
```

---

### Detailed Stage Breakdown

#### Stage 1: New Enquiry
- **Entry Condition:** Incoming WhatsApp message arrives on `+91 8423711043` or form submission logged.
- **SLA:** First human response within **15 minutes** during business hours (9:00 AM – 7:00 PM IST).
- **Responsible:** Sales Desk Lead Coordinator.
- **Action:** Read inbound context (product interest, scale, source); assign to technical specialist.

#### Stage 2: Contact Attempted
- **Entry Condition:** Specialist initiates response via WhatsApp or voice call, but customer has not yet answered.
- **Action:** If unanswered after 2 hours, send a professional WhatsApp follow-up with product overview PDF.
- **Exit Condition:** Customer replies, or 3 contact attempts completed across 48 hours.

#### Stage 3: Contacted
- **Entry Condition:** Two-way conversational communication established.
- **Action:** Greet prospect politely, acknowledge their specific operational query, and establish discovery context.

#### Stage 4: Requirement Understood
- **Entry Condition:** Discovery questions answered:
  1. Business type (Salon, Cafe, Sales Agency, Enterprise).
  2. Operating scale (Seats, outlets, call volume).
  3. Immediate pain point (Offline billing, lost leads, staff commissions).
- **Responsible:** Senior Product Specialist.

#### Stage 5: Qualified
- **Entry Condition:** Meets formal BANT/CHAMP criteria:
  - *Fit:* Customer requirements match Hanva verified product capabilities.
  - *Authority:* Contact is owner, partner, director, or authorized manager.
  - *Timeline:* Implementation planned within 30–60 days.
- **Telemetry Action:** Internal record marked as `lead_qualified`.

#### Stage 6: Demo Requested
- **Entry Condition:** Prospect expresses explicit desire to see live software demonstration.
- **Action:** Offer two specific calendar time slots (e.g., "Tomorrow at 11:30 AM or 4:00 PM IST").

#### Stage 7: Demo Scheduled
- **Entry Condition:** Specific date, time, and meeting link (Google Meet / Zoom) confirmed by prospect.
- **Action:** Send calendar invite with agenda and preparation notes. Send WhatsApp reminder 2 hours prior.

#### Stage 8: Demo Completed
- **Entry Condition:** Live product demonstration successfully conducted by sales engineer.
- **Action:** Walk through genuine software workflows, address customer questions, and verify feature fit.
- **Exit Condition:** Send demo summary document and custom scope outline within 4 hours.

#### Stage 9: Proposal or Pricing Discussion
- **Entry Condition:** Customer requests formal pricing proposal based on their seat/outlet scope.
- **Action:** Deliver custom commercial quote adhering to Hanva standard pricing schedules.

#### Stage 10: Follow-Up Required
- **Entry Condition:** Proposal delivered; customer reviewing with partners or internal stakeholders.
- **SLA & Cadence:** Structured follow-up on Day 2, Day 5, and Day 10.
- **Content:** Share relevant case study, answer implementation questions, or offer second technical clarification call.

#### Stage 11: Won (Closed Customer)
- **Entry Condition:** Commercial agreement signed; initial onboarding payment received.
- **Action:** Transfer customer record to Onboarding & Customer Success team; schedule system setup.

#### Stage 12: Lost (Closed / Disqualified)
- **Entry Condition:** Prospect selects alternate vendor, freezes project, or confirms non-fit.
- **Mandatory Requirement:** Record specific loss reason (e.g., "Requires feature X not currently supported", "Budget constraints", "Project postponed").

---

## 3. Daily Sales Follow-Up Operational Report

Every morning at 09:30 AM IST, the sales engineering desk generates the **Daily Sales Follow-Up Report**:

```text
==============================================================
HANVA TECHNOLOGIES — DAILY SALES OPERATIONS REPORT
Date: [YYYY-MM-DD] | Desk Lead: [Name]
==============================================================

1. INBOUND PIPELINE TELEMETRY (Last 24 Hours)
   • New Enquiries Received:         [Count]
   • First Contact Within SLA:        [% Completed]
   • Active Pipeline Conversations:   [Count]

2. PRODUCT INTEREST BREAKDOWN
   • Hanva CRM:                      [Count]
   • Hanva Salon Software:           [Count]
   • Hanva Restaurant POS:           [Count]
   • Custom Engineering / Telecom:   [Count]

3. QUALIFICATION & DEMO OUTCOMES
   • Leads Formally Qualified:       [Count]
   • Demos Scheduled Today:          [Count]
   • Demos Completed Yesterday:      [Count]
   • Proposals Under Review:         [Count]

4. CRITICAL FOLLOW-UPS & OVERDUE ACTIONS
   • Overdue Callbacks (> 24 hrs):   [Count / List]
   • Proposals Awaiting Response:    [Count / List]
==============================================================
```

---

## 4. CRM Integration Boundary & Security Notice

- This sales follow-up process operates as a **standardized operational runbook** for the sales team.
- **Security Boundary:** The public website does **NOT** write directly to production CRM databases. 
- Pending formal security release approvals on Phase 23.2 and 24, all website lead handoffs remain safely mediated through verified WhatsApp direct routing and sandbox mock endpoints.
