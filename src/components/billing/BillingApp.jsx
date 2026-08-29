import React, { useEffect, useState } from 'react';
import './billing.css';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 50], ["rgba(0,0,0,0)", "rgba(10, 10, 10, 0.8)"]);
  const navBorder = useTransform(scrollY, [0, 50], ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]);
  const navBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

  // Custom Cursor and SEO
  useEffect(() => {
    // SEO
    document.title = "Hanva Billing — Salon Management Software for India | Book, Bill, Grow";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = "Hanva Billing is a complete salon management software. Online booking portal, WhatsApp automation, loyalty programs, staff payroll, GST billing & analytics — all in one platform. Trusted by 1,200+ salons.";
    }

    const cursor = document.getElementById('billing-cursor');
    const moveCursor = (e) => {
      if(cursor) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="billing-page-root relative selection:bg-hanva-gold/30">
      <div id="billing-cursor" className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] transition-transform duration-100 ease-out hidden md:block" style={{ transform: 'translate(-50%, -50%)' }} />
      
      {/* SECTION 1: Navigation Bar */}
      <motion.nav 
        style={{ backgroundColor: navBg, borderBottomColor: navBorder, backdropFilter: navBlur, WebkitBackdropFilter: navBlur }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center relative overflow-hidden">
              <Sparkles className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold text-xl tracking-tight">Hanva Billing</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://biz.hanva.in/sign-in" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Login →
            </a>
            <a href="https://biz.hanva.in/sign-up" className="relative group overflow-hidden rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-hanva-gold/0 via-hanva-gold/30 to-hanva-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
          </div>
        </div>
      </motion.nav>

      {/* SECTION 2: HERO */}
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-hanva-gold/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8"
          >
            <Sparkles className="w-3 h-3 text-hanva-gold" />
            <span>The smartest way to manage your beauty business.</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
          >
            The Complete Operating System <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">for Your Salon Business.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            From booking to billing, loyalty to staff payroll — Hanva Billing handles everything so you can focus on what you do best: making people look amazing.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://biz.hanva.in/sign-up" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </a>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-lg text-white border border-white/10 hover:bg-white/5 transition-all">
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Hero Visual Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative w-full max-w-6xl mx-auto mt-20 px-6 perspective-1000"
        >
          <div className="relative rounded-2xl md:rounded-[2rem] border border-white/10 bg-zinc-950/50 backdrop-blur-3xl overflow-hidden shadow-2xl rotate-x-[5deg] scale-[0.98]">
            <div className="h-8 md:h-12 bg-zinc-900 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="aspect-video relative overflow-hidden bg-black flex">
              {/* Fake Sidebar */}
              <div className="w-48 md:w-64 border-r border-white/5 p-4 hidden md:flex flex-col gap-2">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-8 rounded-md bg-white/5 w-full" />
                ))}
              </div>
              {/* Fake Main Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 relative">
                <div className="h-10 bg-white/10 w-1/3 rounded-lg" />
                <div className="flex gap-4">
                  <div className="h-24 bg-white/5 flex-1 rounded-xl" />
                  <div className="h-24 bg-white/5 flex-1 rounded-xl" />
                  <div className="h-24 bg-white/5 flex-1 rounded-xl" />
                </div>
                <div className="h-64 bg-white/5 w-full rounded-xl" />
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-20 bg-zinc-900 border border-white/10 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-bold">₹</div>
                  <div>
                    <div className="text-xs text-zinc-400">Revenue Today</div>
                    <div className="font-bold text-white">₹2.1L</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -left-4 bottom-20 bg-zinc-900 border border-white/10 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold">47</div>
                  <div>
                    <div className="text-xs text-zinc-400">Bookings</div>
                    <div className="font-bold text-white">Today</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Trust Bar */}
        <div className="w-full mt-20 relative z-10 flex flex-col items-center opacity-70">
          <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">Trusted by 1,200+ salons across India</p>
          <div className="flex gap-8 md:gap-16 items-center justify-center flex-wrap px-6 grayscale">
            <span className="text-xl font-bold font-mono">GLAM STUDIO</span>
            <span className="text-xl font-bold font-mono">LUXE SPA</span>
            <span className="text-xl font-bold font-mono">THE BEAUTY BAR</span>
            <span className="text-xl font-bold font-mono">URBAN CLIPPERS</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURE HIGHLIGHT REEL (Bento Grid) */}
      <section id="features" className="py-32 px-6 bg-black relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Everything you need. <br className="md:hidden" />Nothing you don't.</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Powerful features designed specifically for the Indian beauty industry.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[240px]">
            {/* Card 1: Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-3xl bg-zinc-950 border border-white/5 p-8 relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-hanva-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full">
                <Calendar className="w-8 h-8 text-white mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Smart Appointment Booking</h3>
                <p className="text-zinc-400">Drag-and-drop calendar that prevents double bookings and manages staff availability instantly.</p>
                
                <div className="mt-auto pt-8 flex gap-2">
                  <div className="flex-1 h-32 bg-zinc-900 rounded-t-xl border-t border-x border-white/10 p-3 relative overflow-hidden">
                    <motion.div animate={{ height: ['0%', '60%', '60%'] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-0 left-3 right-3 bg-blue-500/20 border border-blue-500/30 rounded-t-lg" />
                  </div>
                  <div className="flex-1 h-32 bg-zinc-900 rounded-t-xl border-t border-x border-white/10 p-3 relative overflow-hidden">
                    <motion.div animate={{ height: ['0%', '40%', '40%'] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute bottom-0 left-3 right-3 bg-green-500/20 border border-green-500/30 rounded-t-lg" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Medium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl bg-zinc-950 border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <Award className="w-6 h-6 text-hanva-gold mb-4" />
              <h3 className="text-lg font-semibold mb-2">Loyalty Points</h3>
              <p className="text-sm text-zinc-400">Automated rewards that keep them coming back.</p>
            </motion.div>

            {/* Card 3: Medium */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl bg-zinc-950 border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">WhatsApp Auto</h3>
              <p className="text-sm text-zinc-400">Instant reminders and promotional blasts.</p>
            </motion.div>

            {/* Card 4: Small */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl bg-zinc-950 border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors flex flex-col justify-between"
            >
              <div>
                <Users className="w-6 h-6 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold">Staff Payroll</h3>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950" />)}
              </div>
            </motion.div>

            {/* Card 5: Small */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-1 md:row-span-1 rounded-3xl bg-zinc-950 border border-white/5 p-6 relative overflow-hidden group hover:border-white/10 transition-colors"
            >
              <Package className="w-6 h-6 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Inventory</h3>
              <div className="w-full h-2 bg-zinc-900 rounded-full mt-4 overflow-hidden">
                <motion.div animate={{ width: ['20%', '80%', '20%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-purple-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DEEP DIVE FEATURES */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-6">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live right now
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Your salon, available 24/7</h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Customers book online via your unique branded page (biz.hanva.in/book/your-salon). They can browse services, choose their staff, pick a slot, and confirm — all without a phone call. Automated WhatsApp confirmations sent instantly.
              </p>
              <ul className="space-y-4 text-zinc-300">
                <li className="flex gap-3"><CheckCircle2 className="text-white w-5 h-5 flex-shrink-0" /> Zero commission on bookings</li>
                <li className="flex gap-3"><CheckCircle2 className="text-white w-5 h-5 flex-shrink-0" /> Mobile-optimized booking flow</li>
                <li className="flex gap-3"><CheckCircle2 className="text-white w-5 h-5 flex-shrink-0" /> Requires deposit (Optional)</li>
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="relative h-[600px] flex items-center justify-center">
              <div className="w-[300px] h-[600px] bg-zinc-950 border-[8px] border-zinc-900 rounded-[3rem] overflow-hidden relative shadow-2xl">
                {/* Mobile mockup screen */}
                <div className="absolute top-0 inset-x-0 h-6 bg-zinc-900 flex justify-center pt-2"><div className="w-20 h-4 bg-black rounded-full" /></div>
                <div className="p-6 pt-12 flex flex-col gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-white/20 w-3/4 mx-auto rounded-md" />
                  <div className="h-4 bg-white/10 w-1/2 mx-auto rounded-md mb-6" />
                  <div className="space-y-3">
                    <div className="h-16 bg-white/5 rounded-xl" />
                    <div className="h-16 bg-white/5 rounded-xl border border-hanva-gold/30" />
                    <div className="h-16 bg-white/5 rounded-xl" />
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-auto h-12 bg-white rounded-full flex items-center justify-center text-black font-bold"
                  >
                    Confirm Booking
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="order-2 md:order-1 relative h-[500px] bg-zinc-950 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-hanva-gold/20 via-transparent to-transparent opacity-50" />
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="w-72 h-48 bg-gradient-to-br from-zinc-800 to-black rounded-2xl border border-white/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold tracking-wider text-xl">VIP MEMBER</span>
                  <Award className="text-hanva-gold w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm text-zinc-400 mb-1">Available Points</div>
                  <motion.div 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    className="text-3xl font-mono text-hanva-gold font-bold"
                  >
                    1,450
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-semibold mb-6">
                ⭐ Loved by customers
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Turn first-timers into regulars.</h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Automatically award loyalty points on every visit. Set custom rules — earn 1 point per ₹10 spent. Customers redeem points as cash discounts. With referral codes, your customers become your best marketers.
              </p>
            </motion.div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold mb-6">
                💬 Powered by Meta WABA
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Talk to every customer. Automatically.</h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Send booking confirmations, OTP logins, birthday wishes, and promotional campaigns via WhatsApp — directly from the software. No third-party app needed. Powered by Meta Business API.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="relative h-[400px] flex items-center justify-center">
               <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col gap-4">
                 <div className="bg-[#075E54] p-3 rounded-t-xl text-white font-semibold flex items-center gap-3">
                   <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-black" />
                   </div>
                   Hanva Billing
                 </div>
                 <div className="bg-[#DCF8C6] text-black p-3 rounded-2xl rounded-tr-sm self-end max-w-[80%] text-sm shadow-sm relative">
                   Hi Priya! Your appointment for <b>Keratin Treatment</b> is confirmed for tomorrow at 2:00 PM. Reply with YES to confirm.
                   <div className="absolute right-2 bottom-1 text-[10px] text-zinc-500 flex items-center gap-1">1:34 PM <Check className="w-3 h-3 text-blue-500" /></div>
                 </div>
                 <div className="bg-white p-3 rounded-2xl rounded-tl-sm self-start max-w-[80%] text-sm text-black shadow-sm">
                   YES
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Feature 4 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="order-2 md:order-1 relative h-[400px] flex items-center justify-center">
               <div className="w-full h-full bg-zinc-950 border border-white/10 rounded-3xl p-6 relative overflow-hidden flex flex-col gap-4">
                 <div className="flex gap-4">
                   <div className="flex-1 h-24 bg-white/5 rounded-xl p-4 flex flex-col justify-between border border-white/10">
                     <span className="text-zinc-500 text-sm">Revenue</span>
                     <span className="text-xl font-bold text-green-400">₹42,500</span>
                   </div>
                   <div className="flex-1 h-24 bg-white/5 rounded-xl p-4 flex flex-col justify-between border border-white/10">
                     <span className="text-zinc-500 text-sm">Bookings</span>
                     <span className="text-xl font-bold text-blue-400">18</span>
                   </div>
                 </div>
                 <div className="flex-1 bg-white/5 rounded-xl border border-white/10 relative p-4 flex items-end gap-2 overflow-hidden">
                   {[40, 70, 45, 90, 60, 100, 80].map((h, i) => (
                     <motion.div key={i} animate={{ height: [`${h/2}%`, `${h}%`, `${h}%`] }} transition={{ duration: 2, delay: i*0.1 }} className="flex-1 bg-hanva-gold/80 rounded-t-sm" />
                   ))}
                 </div>
               </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold mb-6">
                📊 Real-time data
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">See exactly how your business is growing.</h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Track revenue, bookings, staff performance, customer demographics, top services, and conversion rates — all in one real-time dashboard. Download PDF and Excel reports in one click.
              </p>
            </motion.div>
          </div>

          {/* Feature 5 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold mb-6">
                👥 Complete HR module
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Your team runs on Hanva too.</h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Track attendance, calculate commissions automatically, set individual targets, and manage payroll — all from the same platform. Staff can even check their own performance dashboards.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="relative h-[400px] flex items-center justify-center">
               <div className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-orange-500 flex items-center justify-center font-bold">AK</div>
                   <div>
                     <div className="font-bold">Amit Kumar</div>
                     <div className="text-xs text-zinc-500">Senior Stylist</div>
                   </div>
                 </div>
                 <div>
                   <div className="flex justify-between text-sm mb-2">
                     <span className="text-zinc-400">Monthly Target</span>
                     <span className="font-bold text-orange-400">85%</span>
                   </div>
                   <div className="h-3 bg-zinc-950 rounded-full overflow-hidden">
                     <motion.div animate={{ width: '85%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-orange-500" />
                   </div>
                 </div>
                 <div className="bg-zinc-950 p-4 rounded-xl flex justify-between items-center border border-white/5">
                   <span className="text-zinc-400 text-sm">Earned Commission</span>
                   <span className="font-bold text-lg">₹12,450</span>
                 </div>
               </div>
            </motion.div>
          </div>

          {/* Feature 6 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="order-2 md:order-1 relative h-[400px] flex items-center justify-center">
               <div className="w-64 bg-zinc-800 rounded-lg p-2 shadow-2xl relative z-10 border border-white/10">
                 <motion.div 
                   animate={{ y: [-100, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                   className="w-full bg-white text-black p-4 text-xs font-mono rounded shadow-lg"
                 >
                   <div className="text-center font-bold mb-2">TAX INVOICE</div>
                   <div className="flex justify-between mb-1"><span>Date:</span><span>29 Aug</span></div>
                   <div className="flex justify-between mb-4"><span>Inv:</span><span>#4509</span></div>
                   <div className="border-b border-black/20 pb-2 mb-2">
                     <div className="flex justify-between"><span>Haircut</span><span>₹450</span></div>
                     <div className="flex justify-between"><span>Spa</span><span>₹1200</span></div>
                   </div>
                   <div className="flex justify-between font-bold text-lg"><span>Total:</span><span>₹1650</span></div>
                 </motion.div>
                 <div className="absolute top-0 inset-x-0 h-4 bg-zinc-900 rounded-t-lg border-b border-white/10" />
               </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }} className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold mb-6">
                🧾 GST-ready
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Professional billing in seconds.</h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Create beautiful invoices with your logo, apply discounts, accept multiple payment methods, track pending payments, and send PDF invoices via WhatsApp — all in under 30 seconds.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 5: LIVE STATS */}
      <section className="py-24 px-6 border-y border-white/10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          <StatBox value="1,200+" label="Salons Using" />
          <StatBox value="₹50 Cr+" label="Billing Processed" />
          <StatBox value="4.9 ★" label="Average Rating" />
          <StatBox value="48 hrs" label="Avg. Onboarding" />
        </div>
      </section>

      {/* SECTION 6: INTERACTIVE FEATURE EXPLORER */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">One platform. Every tool.</h2>
            <p className="text-xl text-zinc-400">Everything you need to run your business efficiently.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8">
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              {['Bookings & Calendar', 'Customer Management', 'Billing & Invoices', 'Services & Products', 'Loyalty & Referrals', 'WhatsApp Automation', 'Analytics & Reports'].map((tab, i) => (
                <button key={i} className={`text-left px-6 py-4 rounded-xl font-medium transition-all ${i === 0 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="w-full md:w-2/3 bg-zinc-900 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
              <div className="text-center z-10 p-8">
                <Calendar className="w-16 h-16 text-blue-400 mx-auto mb-6 opacity-80" />
                <h4 className="text-2xl font-bold mb-4">Smart Calendar</h4>
                <p className="text-zinc-400">Interactive preview of the calendar module would render here, showing drag-and-drop bookings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section id="testimonials" className="py-32 px-6 bg-zinc-950 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by top salons.</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x px-6 md:px-0 md:justify-center">
          <TestimonialCard 
            quote="Hanva Billing transformed how we run our salon. The WhatsApp confirmations alone reduced no-shows by 60%."
            author="Priya S." role="Owner, Glam Studio"
          />
          <TestimonialCard 
            quote="The online booking portal means our customers book at midnight and we wake up to a full schedule. Incredible."
            author="Rohan M." role="Manager, Luxe Spa"
          />
          <TestimonialCard 
            quote="Staff commission tracking used to take me 4 hours a month. Now it's instant."
            author="Sneha T." role="Owner, The Beauty Bar"
          />
        </div>
      </section>

      {/* SECTION 8: PRICING (Skipping 6 & 7 due to length, building core sections first) */}
      <section id="pricing" className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple pricing. No surprises.</h2>
            <p className="text-xl text-zinc-400">Start free. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              name="Starter" price="₹999" tagline="Perfect to start" 
              features={['Up to 5 Staff', '1 Branch', 'Basic Analytics', 'Standard Support']}
              cta="Start Free Trial"
            />
            <PricingCard 
              name="Growth" price="₹2,499" tagline="For growing salons" highlighted
              features={['Up to 20 Staff', '3 Branches', 'Advanced Analytics', 'WhatsApp Automation', 'Priority Support']}
              cta="Start Free Trial"
            />
            <PricingCard 
              name="Enterprise" price="Custom" tagline="For chains" 
              features={['Unlimited Staff', 'Unlimited Branches', 'Custom Analytics', 'WhatsApp Automation', 'Dedicated Account Manager']}
              cta="Contact Sales"
            />
          </div>
        </div>
      </section>

      {/* SECTION 9: COMPARISON TABLE */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">How does Hanva compare?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-4 border-b border-white/10 text-zinc-400 font-medium w-1/3">Feature</th>
                  <th className="p-4 border-b border-hanva-gold/30 bg-hanva-gold/5 text-hanva-gold font-bold text-center rounded-t-xl">Hanva Billing</th>
                  <th className="p-4 border-b border-white/10 text-zinc-400 font-medium text-center">Generic POS</th>
                  <th className="p-4 border-b border-white/10 text-zinc-400 font-medium text-center">Spreadsheets</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Online Booking Portal', true, false, false],
                  ['WhatsApp Automation', true, false, false],
                  ['Loyalty & Referrals', true, false, false],
                  ['Staff Commission Tracking', true, 'Partial', false],
                  ['Customer Profile + History', true, 'Partial', false],
                  ['Real-time Analytics', true, false, false],
                  ['GST Invoice', true, true, false],
                  ['Multi-branch Support', true, false, false],
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors">
                    <td className="p-4 border-b border-white/5 font-medium">{row[0]}</td>
                    <td className="p-4 border-b border-white/5 bg-hanva-gold/5 text-center">
                      {row[1] === true ? <CheckCircle2 className="w-5 h-5 text-hanva-gold mx-auto" /> : <span className="text-zinc-500">{row[1]}</span>}
                    </td>
                    <td className="p-4 border-b border-white/5 text-center">
                      {row[2] === true ? <CheckCircle2 className="w-5 h-5 text-zinc-400 mx-auto" /> : row[2] === false ? <X className="w-5 h-5 text-zinc-700 mx-auto" /> : <span className="text-zinc-500">{row[2]}</span>}
                    </td>
                    <td className="p-4 border-b border-white/5 text-center">
                      {row[3] === true ? <CheckCircle2 className="w-5 h-5 text-zinc-400 mx-auto" /> : row[3] === false ? <X className="w-5 h-5 text-zinc-700 mx-auto" /> : <span className="text-zinc-500">{row[3]}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section id="faq" className="py-32 px-6 bg-zinc-950">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Got questions? We've got answers.</h2>
          </div>
          <div className="space-y-4">
            <FaqItem question="Is Hanva Billing only for salons?" answer="Hanva Billing is perfect for salons, spas, aesthetic clinics, tattoo studios, and any appointment-based beauty and wellness business." />
            <FaqItem question="Do I need any hardware or installation?" answer="No! Hanva is 100% cloud-based. You can access it from your phone, tablet, PC, or Mac through a web browser." />
            <FaqItem question="Can my customers book online without downloading an app?" answer="Yes. They book via your customized booking link (e.g. biz.hanva.in/book/yoursalon) which works directly in their mobile browser." />
            <FaqItem question="How does the WhatsApp integration work?" answer="We use the official Meta Cloud API to send automated confirmations, OTPs, and campaigns directly from your system to your clients' WhatsApp." />
          </div>
        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-60" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to transform your salon?</h2>
          <p className="text-xl text-zinc-400 mb-10">Start your 14-day free trial — no credit card required.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <a href="https://biz.hanva.in/sign-up" className="px-8 py-4 bg-white text-black font-semibold rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              Start Free Trial →
            </a>
            <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-full text-lg hover:bg-white/5 transition-colors">
              Book a Live Demo
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500 font-medium">
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Setup in 48 hours</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> WhatsApp support</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* SECTION 12: FOOTER */}
      <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-lg">Hanva Billing</span>
            </div>
            <p className="text-zinc-500 text-sm mb-6">The smartest way to manage your beauty business.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="https://hanva.in" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-600">
          <p>© 2025 Hanva Technologies. Made with ❤️ in India.</p>
        </div>
      </footer>
    </div>
  );
}

function StatBox({ value, label }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6"
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</div>
      <div className="text-zinc-500 font-medium">{label}</div>
    </motion.div>
  );
}

function PricingCard({ name, price, tagline, features, cta, highlighted = false }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className={`p-8 rounded-3xl relative ${highlighted ? 'bg-zinc-900 border-2 border-hanva-gold/50 shadow-[0_0_40px_rgba(212,175,55,0.1)]' : 'bg-zinc-950 border border-white/10'}`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-hanva-gold text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-black" /> Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <p className="text-zinc-400 text-sm mb-6 h-5">{tagline}</p>
      <div className="mb-8">
        <span className="text-5xl font-bold tracking-tight">{price}</span>
        {price !== 'Custom' && <span className="text-zinc-500">/mo</span>}
      </div>
      <button className={`w-full py-3 rounded-full font-semibold mb-8 transition-colors ${highlighted ? 'bg-white text-black hover:bg-zinc-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
        {cta}
      </button>
      <ul className="space-y-4">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
            <CheckCircle2 className={`w-4 h-4 ${highlighted ? 'text-hanva-gold' : 'text-zinc-500'}`} /> {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="min-w-[300px] md:min-w-[400px] bg-black border border-white/10 p-8 rounded-3xl snap-center flex flex-col justify-between">
      <div className="mb-6 flex gap-1">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-hanva-gold text-hanva-gold" />)}
      </div>
      <p className="text-lg text-zinc-300 mb-8 font-medium italic">"{quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-white uppercase">{author[0]}</div>
        <div>
          <div className="font-bold text-white">{author}</div>
          <div className="text-sm text-zinc-500">{role}</div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-black transition-colors hover:border-white/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-zinc-400"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
