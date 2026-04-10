"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, User, Building2, Mail, Phone, Layers, FileText } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { SITE } from "@/data/site";

/* ─── Validation helpers ─────────────────────────────────────── */
type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  category: string;
  specs: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = "Full name is required.";
  else if (fields.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!fields.company.trim()) errors.company = "Company name is required.";

  if (!fields.email.trim()) errors.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a valid email address.";

  if (fields.phone && !/^[+\d\s\-().]{7,20}$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!fields.specs.trim()) errors.specs = "Please describe your product specifications.";
  else if (fields.specs.trim().length < 20) errors.specs = "Please provide at least 20 characters of detail.";

  return errors;
}

/* ─── Field wrapper with animated error ─────────────────────── */
function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.18 }}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-red-500 mt-1.5 overflow-hidden"
        >
          <AlertCircle size={11} className="shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function fieldClass(error?: string, touched?: boolean) {
  const base =
    "w-full h-12 bg-white border px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 rounded-none";
  if (error && touched) return `${base} border-red-400 focus:border-red-400 ring-1 ring-red-200`;
  return `${base} border-zinc-200 focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]/30`;
}

const CATEGORIES = [
  "Agricultural Commodities",
  "Heavy Machinery Procurement",
  "Logistics & Supply Chain",
  "Compliance & Documentation",
  "Partnership Proposal",
  "Other / General",
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const [fields, setFields] = useState<Fields>({
    name: "", company: "", email: "", phone: "", category: CATEGORIES[0], specs: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});

  const formRef = useRef<HTMLFormElement>(null);

  function set(key: keyof Fields, value: string) {
    const next = { ...fields, [key]: value };
    setFields(next);
    // Clear error as user types (real-time feedback)
    if (errors[key]) {
      const nextErrors = { ...errors };
      delete nextErrors[key];
      setErrors(nextErrors);
    }
  }

  function blur(key: keyof Fields) {
    setTouched((t) => ({ ...t, [key]: true }));
    const err = validate({ ...fields });
    setErrors((e) => ({ ...e, [key]: err[key] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mark all required fields as touched
    setTouched({ name: true, company: true, email: true, phone: true, specs: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // Scroll to first error
      const firstKey = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`)?.focus();
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }
      setRefId(data.refId || Date.now().toString().slice(-6));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit request. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-[#fafaf9] min-h-screen selection:bg-[#C4882A]/20 selection:text-[#C4882A]">

      <PageHero
        badge="Procurement Desk"
        title="Request a"
        highlight="Quote."
        subtitle="Let us source your next big requirement. Our global trade desk will respond with verified pricing within 24 hours."
      />

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* ── FORM ── */}
            <motion.div
              className="lg:col-span-8 order-2 lg:order-1"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              <div className="bg-white border border-zinc-200 overflow-hidden">

                {/* Form header bar */}
                <div className="h-px bg-[#C4882A]/60" />
                <div className="px-8 md:px-12 pt-10 pb-8 border-b border-zinc-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-px bg-[#C4882A]" />
                    <h2 className="font-display text-xs font-black text-zinc-900 uppercase tracking-[0.18em]">Quotation Request</h2>
                  </div>
                  <p className="font-lato text-zinc-500 text-sm leading-relaxed">
                    Provide specific details for an accurate and expedited quotation.
                    Fields marked <span className="text-[#C4882A] font-bold">*</span> are required.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    /* ── SUCCESS STATE ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col items-center text-center px-8 md:px-12 py-20 gap-8"
                    >
                      {/* Animated check */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="relative w-20 h-20"
                      >
                        <div className="absolute inset-0 bg-[#C4882A]/10 rounded-full animate-ping" />
                        <div className="relative w-20 h-20 bg-[#09090B] flex items-center justify-center">
                          <CheckCircle2 size={32} className="text-[#C4882A]" />
                        </div>
                      </motion.div>

                      <div className="max-w-xs">
                        <h2 className="font-display text-3xl font-black text-zinc-900 mb-3 tracking-tight">Request Received</h2>
                        <p className="font-lato text-zinc-500 text-sm leading-relaxed">
                          Our trade desk will review your specifications and contact you within{" "}
                          <span className="font-semibold text-zinc-700">{SITE.contact.responseTime}</span>.
                        </p>
                      </div>

                      <div className="bg-zinc-50 border border-zinc-200 p-6 w-full max-w-xs flex flex-col items-center gap-1">
                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">Reference ID</p>
                        <p className="text-zinc-900 font-mono font-black text-xl tracking-widest">ATC-{refId}</p>
                        <p className="text-[10px] text-zinc-400 mt-1">Save this for follow-up queries</p>
                      </div>

                      <button
                        onClick={() => { setIsSubmitted(false); setFields({ name: "", company: "", email: "", phone: "", category: CATEGORIES[0], specs: "" }); setTouched({}); setErrors({}); }}
                        className="text-xs font-bold text-[#C4882A] hover:text-[#D4952E] uppercase tracking-[0.15em] transition-colors"
                      >
                        Submit another request
                      </button>
                    </motion.div>

                  ) : (
                    /* ── FORM FIELDS ── */
                    <motion.div key="form" exit={{ opacity: 0 }}>
                      <form ref={formRef} onSubmit={handleSubmit} noValidate className="px-8 md:px-12 py-10 space-y-7">

                        {/* Row 1 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center gap-1.5 font-lato text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                              <User size={10} className="text-zinc-400" /> Full Name <span className="text-[#C4882A]">*</span>
                            </label>
                            <input
                              data-field="name"
                              name="name"
                              type="text"
                              placeholder="John Doe"
                              value={fields.name}
                              onChange={(e) => set("name", e.target.value)}
                              onBlur={() => blur("name")}
                              className={fieldClass(errors.name, touched.name)}
                            />
                            <FieldError message={touched.name ? errors.name : undefined} />
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 font-lato text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                              <Building2 size={10} className="text-zinc-400" /> Company <span className="text-[#C4882A]">*</span>
                            </label>
                            <input
                              data-field="company"
                              name="company"
                              type="text"
                              placeholder="Acme Corp."
                              value={fields.company}
                              onChange={(e) => set("company", e.target.value)}
                              onBlur={() => blur("company")}
                              className={fieldClass(errors.company, touched.company)}
                            />
                            <FieldError message={touched.company ? errors.company : undefined} />
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center gap-1.5 font-lato text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                              <Mail size={10} className="text-zinc-400" /> Work Email <span className="text-[#C4882A]">*</span>
                            </label>
                            <input
                              data-field="email"
                              name="email"
                              type="email"
                              placeholder="john@acme.com"
                              value={fields.email}
                              onChange={(e) => set("email", e.target.value)}
                              onBlur={() => blur("email")}
                              className={fieldClass(errors.email, touched.email)}
                            />
                            <FieldError message={touched.email ? errors.email : undefined} />
                          </div>
                          <div>
                            <label className="flex items-center gap-1.5 font-lato text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                              <Phone size={10} className="text-zinc-400" /> Phone Number
                            </label>
                            <input
                              data-field="phone"
                              name="phone"
                              type="tel"
                              placeholder="+880 1711-000000"
                              value={fields.phone}
                              onChange={(e) => set("phone", e.target.value)}
                              onBlur={() => blur("phone")}
                              className={fieldClass(errors.phone, touched.phone)}
                            />
                            <FieldError message={touched.phone ? errors.phone : undefined} />
                          </div>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="flex items-center gap-1.5 font-lato text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                            <Layers size={10} className="text-zinc-400" /> Request Category
                          </label>
                          <div className="relative">
                            <select
                              name="category"
                              value={fields.category}
                              onChange={(e) => set("category", e.target.value)}
                              className="w-full h-12 bg-white border border-zinc-200 px-4 text-zinc-900 text-sm outline-none focus:border-[#C4882A] focus:ring-1 focus:ring-[#C4882A]/30 appearance-none cursor-pointer transition-all rounded-none"
                            >
                              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                          </div>
                        </div>

                        {/* Specs */}
                        <div>
                          <label className="flex items-center gap-1.5 font-lato text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500 mb-2">
                            <FileText size={10} className="text-zinc-400" /> Product Specifications <span className="text-[#C4882A]">*</span>
                          </label>
                          <textarea
                            data-field="specs"
                            name="specs"
                            placeholder="Please describe: product/material name, quantity, grade or specification, target destination, and required timeline."
                            value={fields.specs}
                            onChange={(e) => set("specs", e.target.value)}
                            onBlur={() => blur("specs")}
                            rows={6}
                            className={`${fieldClass(errors.specs, touched.specs).replace("h-12", "")} resize-none min-h-[150px] py-3`}
                          />
                          <div className="flex items-start justify-between mt-1">
                            <FieldError message={touched.specs ? errors.specs : undefined} />
                            <span className={`text-[10px] ml-auto font-medium tabular-nums ${fields.specs.length < 20 && touched.specs ? "text-red-400" : "text-zinc-400"}`}>
                              {fields.specs.length} / 20 min
                            </span>
                          </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-full h-14 bg-[#09090B] hover:bg-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400 text-white font-bold text-sm transition-all flex items-center justify-center gap-3 group overflow-hidden"
                          >
                            {/* Shimmer on hover */}
                            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                            {isSubmitting ? (
                              <><span className="relative">Processing Request</span><div className="relative h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /></>
                            ) : (
                              <><span className="relative">Submit RFQ</span><ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" /></>
                            )}
                          </button>
                          <p className="text-[10px] text-zinc-400 text-center mt-3 leading-relaxed">
                            By submitting, you agree to our{" "}
                            <a href="/terms" className="underline hover:text-[#C4882A] transition-colors">Terms of Trade</a>{" "}
                            and{" "}
                            <a href="/privacy" className="underline hover:text-[#C4882A] transition-colors">Privacy Policy</a>.
                          </p>
                        </div>

                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* ── SIDEBAR ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="lg:col-span-4 order-1 lg:order-2 space-y-4"
            >
              {/* Direct contact card */}
              <div className="bg-white border border-zinc-200 overflow-hidden">
                <div className="h-px bg-[#C4882A]/60" />
                <div className="p-7">
                  <span className="inline-flex items-center gap-2 font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-4">
                    <span className="w-3 h-px bg-[#C4882A]" /> Direct Contact
                  </span>
                  <div className="space-y-4 text-sm mt-2">
                    <div>
                      <p className="font-lato text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">Email</p>
                      <a href={`mailto:${SITE.contact.email}`} className="text-zinc-800 font-semibold hover:text-[#C4882A] transition-colors">{SITE.contact.email}</a>
                    </div>
                    <div>
                      <p className="font-lato text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">Phone</p>
                      <a href={`tel:${SITE.contact.phoneRaw}`} className="text-zinc-800 font-semibold hover:text-[#C4882A] transition-colors">{SITE.contact.phone}</a>
                    </div>
                    <div>
                      <p className="font-lato text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">Corporate HQ</p>
                      <p className="font-lato text-zinc-700 leading-relaxed">{SITE.contact.address}</p>
                    </div>
                    <div>
                      <p className="font-lato text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">Hours</p>
                      <p className="font-lato text-zinc-700">{SITE.contact.officeHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade guarantee card */}
              <div className="bg-[#09090B] overflow-hidden">
                <div className="h-px bg-[#C4882A]/60" />
                <div className="p-7">
                  <span className="inline-flex items-center gap-2 font-cormorant text-[10px] font-bold text-[#C4882A] uppercase tracking-[0.2em] mb-5">
                    <span className="w-3 h-px bg-[#C4882A]" /> Trade Guarantee
                  </span>
                  <div className="space-y-4">
                    {[
                      "Response within 24 hours",
                      "ISO 9001:2015 certified operations",
                      "Dedicated trade desk manager",
                      "Phytosanitary & LC documentation",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 font-lato text-sm text-zinc-400">
                        <span className="w-4 h-4 mt-0.5 border border-[#C4882A]/30 flex items-center justify-center shrink-0">
                          <span className="w-1.5 h-1.5 bg-[#C4882A]" />
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={SITE.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-5 bg-green-600 hover:bg-green-500 text-white transition-colors group"
              >
                <div>
                  <p className="font-lato text-[10px] font-bold uppercase tracking-widest text-green-200 mb-0.5">Faster response</p>
                  <p className="font-display font-bold text-sm">Chat on WhatsApp</p>
                </div>
                <ArrowRight size={16} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}