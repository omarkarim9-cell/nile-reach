"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  interest: string;
  quantity: string;
  message: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  interest: "",
  quantity: "",
  message: "",
};

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-earth-500/10 border border-earth-500/30 p-8 md:p-10 text-center">
        <CheckCircle2
          className="h-12 w-12 text-earth-600 mx-auto mb-4"
          strokeWidth={1.5}
        />
        <h3 className="font-display text-2xl text-nile-900 font-medium mb-3">
          {t("successTitle")}
        </h3>
        <p className="text-base text-nile-700/85 leading-relaxed max-w-md mx-auto">
          {t("successBody")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-nile-700 hover:text-nile-900 transition-colors underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label={t("name")}
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={t("namePlaceholder")}
        />
        <Field
          label={t("company")}
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder={t("companyPlaceholder")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label={t("email")}
          required
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder={t("emailPlaceholder")}
        />
        <Field
          label={t("phone")}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={t("phonePlaceholder")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label={t("country")}
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder={t("countryPlaceholder")}
        />
        <div>
          <label className="block text-xs font-medium text-nile-700 uppercase tracking-wider mb-2">
            {t("interest")}
          </label>
          <select
            name="interest"
            value={form.interest}
            onChange={handleChange}
            className="w-full rounded-lg border border-nile-200 bg-white px-4 py-3 text-base text-nile-900 focus:outline-none focus:ring-2 focus:ring-sand-400 focus:border-transparent transition-all"
          >
            <option value="">{t("interestPlaceholder")}</option>
            <option value="livestock">{t("interestLivestock")}</option>
            <option value="crops">{t("interestCrops")}</option>
            <option value="processed">{t("interestProcessed")}</option>
            <option value="other">{t("interestOther")}</option>
          </select>
        </div>
      </div>

      <Field
        label={t("quantity")}
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        placeholder={t("quantityPlaceholder")}
      />

      <div>
        <label className="block text-xs font-medium text-nile-700 uppercase tracking-wider mb-2">
          {t("message")} <span className="text-sand-600">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-lg border border-nile-200 bg-white px-4 py-3 text-base text-nile-900 placeholder-nile-400 focus:outline-none focus:ring-2 focus:ring-sand-400 focus:border-transparent transition-all resize-y"
        />
      </div>

      {status === "error" && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 flex items-start gap-3">
          <AlertCircle
            className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
            strokeWidth={2}
          />
          <div>
            <p className="text-sm font-semibold text-red-900">
              {t("errorTitle")}
            </p>
            <p className="text-sm text-red-700">{t("errorBody")}</p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-nile-800 px-7 py-3.5 text-sm font-semibold text-sand-50 transition-all hover:bg-nile-900 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          t("submitting")
        ) : (
          <>
            {t("submit")}
            <Send className="h-4 w-4 rtl:rotate-180" strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-medium text-nile-700 uppercase tracking-wider mb-2">
        {label} {required && <span className="text-sand-600">*</span>}
      </label>
      <input
        {...props}
        required={required}
        className="w-full rounded-lg border border-nile-200 bg-white px-4 py-3 text-base text-nile-900 placeholder-nile-400 focus:outline-none focus:ring-2 focus:ring-sand-400 focus:border-transparent transition-all"
      />
    </div>
  );
}
