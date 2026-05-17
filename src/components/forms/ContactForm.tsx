"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-charcoal/10 p-10"
      >
        <p className="font-serif text-2xl text-charcoal">Thank you</p>
        <p className="mt-4 font-sans text-sm text-charcoal/60">
          Your appointment request has been received. We will confirm within two
          business days.
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
      className="space-y-6"
    >
      {[
        { id: "name", label: "Name", type: "text" },
        { id: "email", label: "Email", type: "email" },
        { id: "phone", label: "Phone", type: "tel" },
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
            required
            className="w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-sm text-charcoal outline-none transition-colors focus:border-charcoal"
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="interest"
          className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50"
        >
          Interest
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full border-b border-charcoal/20 bg-transparent py-3 font-sans text-sm text-charcoal outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          <option value="appointment">Showroom appointment</option>
          <option value="enquiry">Piece enquiry</option>
          <option value="project">Project consultation</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="mb-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50"
        >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full resize-none border-b border-charcoal/20 bg-transparent py-3 font-sans text-sm text-charcoal outline-none"
        />
      </div>

      <button type="submit" className="btn-minimal mt-4">
        Request appointment
      </button>
    </form>
  );
}
