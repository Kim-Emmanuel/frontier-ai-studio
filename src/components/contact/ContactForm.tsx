"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type FormState = {
  name: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
  budget?: string;
  timeline?: string;
};

const initial: FormState = { name: "", email: "", message: "", company: "", role: "", budget: "", timeline: "" };

const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: "" }));
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!validateEmail(form.email)) err.email = "Enter a valid email";
    if (!form.message.trim() || form.message.trim().length < 10) err.message = "Please include a short message (min 10 chars)";
    return err;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setSubmitting(true);
    try {
      // Placeholder: integrate with real API or email service
      await new Promise((r) => setTimeout(r, 700));
      setSubmitted(true);
      setForm(initial);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container size="md" className="py-12 relative z-10">
      <Card as="section" className="bg-card/80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-2">Get in touch</h2>
        <p className="text-muted mb-6">Multiple ways to reach us — or send a message below.</p>

        {submitted ? (
          <div className="space-y-3">
            <p className="text-lg">Thanks! We&apos;ll get back to you within 48 hours.</p>
            <Button variant="primary" onClick={() => setSubmitted(false)}>Send another message</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm mb-1">Name</label>
              <input value={form.name} onChange={onChange("name")} className="input w-full" placeholder="Your name" />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm mb-1">Email</label>
              <input value={form.email} onChange={onChange("email")} className="input w-full" placeholder="you@company.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Company (optional)</label>
              <input value={form.company} onChange={onChange("company")} className="input w-full" placeholder="Company name" />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm mb-1">Role (optional)</label>
              <input value={form.role} onChange={onChange("role")} className="input w-full" placeholder="Your role" />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm mb-1">Budget (optional)</label>
              <input value={form.budget} onChange={onChange("budget")} className="input w-full" placeholder="$5k - $50k" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Project timeline (optional)</label>
              <input value={form.timeline} onChange={onChange("timeline")} className="input w-full" placeholder="Q1 2026, 3 months, etc." />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm mb-1">Message</label>
              <textarea value={form.message} onChange={onChange("message")} rows={6} className="input w-full resize-y" placeholder="Tell us about your project or question" />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <div className="sm:col-span-2 flex items-center justify-between mt-2">
              <div className="text-xs text-muted">Expected reply: within 48 hours</div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" type="button" onClick={() => setForm(initial)}>Clear</Button>
                <Button variant="primary" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'}</Button>
              </div>
            </div>

            {errors.submit && <p className="text-red-500 text-sm sm:col-span-2">{errors.submit}</p>}
          </form>
        )}
      </Card>
    </Container>
  );
};

export default ContactForm;
