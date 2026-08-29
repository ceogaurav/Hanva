import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Award, MessageCircle, Users, BarChart3, Receipt, 
  Building2, Package, CheckCircle2, ChevronDown, Sparkles, Play,
  Smartphone, Monitor, User, Clock, ArrowRight, Check, X, Shield, Star
} from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function BillingApp() {
  useEffect(() => {
    document.title = "Hanva Billing — Salon Management Software | Book, Bill, Grow";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "Hanva Billing is a complete salon management software. Trusted by 1,200+ salons.";
    }
  }, []);

  return (
    <div className="billing-page-root" style={{ width: '100%' }}>
      {/* SECTION: Hero */}
      <section className="hero-sec" >
        <div className="container hero-grid">
          <motion.div 
            className="hero-text-content"
            initial="hidden" animate="visible" variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="hero-subtitle-badge">
              <span className="badge-dot"></span>
              <span>The smartest way to manage your beauty business.</span>
            </motion.div>
            <motion.h1 variants={fadeIn} className="hero-title">
              The Complete Operating <span>System</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="hero-desc">
              From booking to billing, loyalty to staff payroll — Hanva Billing handles everything so you can focus on making people look amazing.
            </motion.p>
            <motion.div variants={fadeIn} className="hero-ctas">
              <a href="https://biz.hanva.in/sign-up" className="btn btn-primary" data-hover="expand">Start Free Trial</a>
              <a href="#demo" className="btn btn-secondary" data-hover="expand">Watch Demo</a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="glow-sphere"></div>
            <div className="hero-mock-frame glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div className="terminal-header">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
                <span className="terminal-title">hanva_billing.exe</span>
              </div>
              <div className="terminal-body" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src="/billing_gateway.png" alt="Dashboard Preview" style={{ maxWidth: '100%', height: 'auto', opacity: 0.8 }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span style="color: var(--accent-cyan); font-size: 24px;">Dashboard Initialized...</span>'; }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: Stats */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="stats-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="stat-card glass-card">
              <div className="stat-num">1,200+</div>
              <div className="stat-label">Salons & Spas</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="stat-card glass-card">
              <div className="stat-num">₹25L+</div>
              <div className="stat-label">Processed Daily</div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="stat-card glass-card">
              <div className="stat-num">4.9/5</div>
              <div className="stat-label">Customer Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: Features */}
      <section id="features">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            <span className="section-subtitle">Core Features</span>
            <h2 className="section-title">Everything you need. Nothing you don't.</h2>
            <p className="section-desc">Powerful features designed specifically for the Indian beauty industry.</p>
          </motion.div>
          
          <div className="cards-grid">
            {[
              { icon: <Calendar className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />, title: "Smart Booking", desc: "Drag-and-drop calendar that prevents double bookings instantly." },
              { icon: <Award className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />, title: "Loyalty Points", desc: "Automated rewards that keep them coming back." },
              { icon: <MessageCircle className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />, title: "WhatsApp Auto", desc: "Instant reminders and promotional blasts via official APIs." },
              { icon: <Users className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />, title: "Staff Payroll", desc: "Complex commissions and attendance tracked automatically." },
              { icon: <Package className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />, title: "Inventory", desc: "Low-stock alerts and automatic deductions on billing." },
              { icon: <BarChart3 className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />, title: "Analytics", desc: "Real-time insights into your top services and staff." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
                className="service-card glass-card"
              >
                <div>
                  <div className="service-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {feature.icon}
                  </div>
                  <h3 className="card-title">{feature.title}</h3>
                  <p className="card-desc">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Deep Dive - WhatsApp */}
      <section style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <span className="section-subtitle">Powered by Meta WABA</span>
              <h2 className="section-title">Talk to every customer. Automatically.</h2>
              <p className="section-desc mb-6">Send booking confirmations, OTP logins, birthday wishes, and promotional campaigns via WhatsApp — directly from the software. No third-party app needed.</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {['Official Meta API Integration', 'Zero ban risk for bulk promotions', 'Automated feedback collection', 'Birthday & Anniversary triggers'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-primary)' }}>
                    <CheckCircle2 style={{ color: 'var(--accent-cyan)' }} className="w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="glass-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
               <div style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(37, 211, 102, 0.2)', marginLeft: 'auto', maxWidth: '80%' }}>
                 <p style={{ color: 'var(--text-primary)', fontSize: '14px' }}>Hi Priya! Your appointment for <strong>Keratin Treatment</strong> is confirmed for tomorrow at 2:00 PM. Reply with YES to confirm.</p>
               </div>
               <div style={{ background: 'var(--bg-primary)', padding: '15px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginRight: 'auto' }}>
                 <p style={{ color: 'var(--text-primary)', fontSize: '14px' }}>YES</p>
               </div>
               <div style={{ background: 'rgba(37, 211, 102, 0.1)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(37, 211, 102, 0.2)', marginLeft: 'auto', maxWidth: '80%' }}>
                 <p style={{ color: 'var(--text-primary)', fontSize: '14px' }}>Great! We will see you tomorrow. 💖</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: Pricing */}
      <section id="pricing">
        <div className="container">
          <motion.div 
            className="section-header"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          >
            <span className="section-subtitle">Pricing</span>
            <h2 className="section-title">Simple pricing. No surprises.</h2>
            <p className="section-desc">Get access to all features with a flat monthly rate. No hidden fees or commission cuts.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '900px', margin: '0 auto' }}>
            {/* Standard Plan */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Standard</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '10px', color: 'var(--accent-cyan)' }}>₹999<span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '400' }}>/mo</span></div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Perfect for single branch salons.</p>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', flex: 1 }}>
                {['Unlimited Appointments', 'Basic Analytics', 'WhatsApp Manual Messaging', 'Staff Management'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              
              <a href="https://biz.hanva.in/sign-up" className="btn btn-secondary w-full" data-hover="expand" style={{ width: '100%', textAlign: 'center' }}>Start 14-Day Free Trial</a>
            </motion.div>

            {/* Pro Plan */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="glass-card neon-border" style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-cyan))', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', color: '#fff', letterSpacing: '1px' }}>MOST POPULAR</div>
              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px' }}>Premium</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '10px', color: 'var(--accent-cyan)' }}>₹1,999<span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '400' }}>/mo</span></div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>For growing multi-branch chains.</p>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '40px', flex: 1 }}>
                {['Everything in Standard', 'Automated WhatsApp APIs', 'Advanced Loyalty Engine', 'Multi-branch Support', 'Inventory Management'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ color: 'var(--text-primary)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              
              <a href="https://biz.hanva.in/sign-up" className="btn btn-primary w-full" data-hover="expand" style={{ width: '100%', textAlign: 'center' }}>Start 14-Day Free Trial</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="section-title neon-text" style={{ fontSize: '48px', marginBottom: '24px' }}
          >
            Ready to upgrade your salon?
          </motion.h2>
          <motion.p 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}
          >
            Join 1,200+ beauty businesses across India that use Hanva to automate their daily operations.
          </motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <a href="https://biz.hanva.in/sign-up" className="btn btn-primary" data-hover="expand" style={{ fontSize: '16px', padding: '16px 32px' }}>Get Started Free</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
