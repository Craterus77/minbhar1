"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function TradeForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-charcoal/10 bg-travertine/30 p-10 md:p-12"
      >
        <p className="font-serif text-2xl text-charcoal">Application received</p>
        <p className="mt-4 font-sans text-sm text-charcoal/60">
          We review trade applications within five business days. A member of our
          studio will be in touch.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="border border-charcoal/10 bg-travertine/20 p-8 md:p-10"
    >
      <p className="section-label mb-8">Apply</p>

      <div className="space-y-6">
        {[
          { id: "name", label: "Full name", type: "text", required: true },
          { id: "studio", label: "Studio / Firm", type: "text", required: true },
          { id: "email", label: "Email", type: "email", required: true },
          { id: "website", label: "Website", type: "url", required: false },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              required={field.required}
              className="w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="message"
            className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50"
          >
            Project overview
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none border-b border-charcoal/20 bg-transparent py-3 font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal"
          />
        </div>
      </div>

      <button type="submit" className="btn-minimal mt-10">
        Submit application
      </button>
    </form>
  );
}
