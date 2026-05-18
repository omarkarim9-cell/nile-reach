"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ShieldCheck, Stethoscope, BadgeCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

const facilityPhotos = [
  "/images/processing-1.jpg",
  "/images/processing-halal-stamps.jpg",
  "/images/processing-wrapped.jpg",
];

export default function QualityPage() {
  const t = useTranslations("quality.page");
  const [showPhotos, setShowPhotos] = useState(false);

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/processing-1.jpg"
      />

      {/* ===== STANDARDS (3 columns) ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.28em] text-sand-500 mb-3">
            — {t("standardsTitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <StandardCard
            icon={<ShieldCheck className="h-6 w-6" strokeWidth={1.7} />}
            title={t("halalTitle")}
            body={t("halalBody")}
            accent="nile"
          />
          <StandardCard
            icon={<Stethoscope className="h-6 w-6" strokeWidth={1.7} />}
            title={t("vetTitle")}
            body={t("vetBody")}
            accent="earth"
          />
          <StandardCard
            icon={<BadgeCheck className="h-6 w-6" strokeWidth={1.7} />}
            title={t("isoTitle")}
            body={t("isoBody")}
            accent="sand"
          />
        </div>
      </section>

      {/* ===== PROCESS TIMELINE ===== */}
      <section className="bg-sand-100/50 border-y border-sand-200/60">
        <div className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.28em] text-sand-600 mb-4">
              — {t("processTitle")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-medium text-nile-900 leading-tight tracking-tight">
              {t("processSubtitle")}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7].map((n, i, arr) => (
              <TimelineRow
                key={n}
                number={n}
                text={t(`step${n}`)}
                isLast={i === arr.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACILITY PHOTOS (B2B gated) ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-10">
          <div className="md:col-span-1">
            <p className="text-xs uppercase tracking-[0.28em] text-sand-500 mb-3">
              — {t("facilityTitle")}
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-base md:text-lg text-nile-700/85 leading-relaxed mb-6">
              {t("facilityBody")}
            </p>

            <div className="rounded-2xl border border-sand-300 bg-sand-50 p-5 md:p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-sand-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.18em] text-sand-600 font-semibold mb-2">
                    {t("tradeOnlyLabel")}
                  </p>
                  <p className="text-sm text-nile-700/85 leading-relaxed mb-4">
                    {t("tradeOnlyNotice")}
                  </p>
                  <button
                    onClick={() => setShowPhotos((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-full bg-nile-900 px-5 py-2 text-xs font-semibold text-sand-50 hover:bg-nile-800 transition-colors"
                  >
                    {showPhotos ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" strokeWidth={2} />
                        Hide photos
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" strokeWidth={2} />
                        View photos
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showPhotos && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-fade-up">
            {facilityPhotos.map((src) => (
              <div
                key={src}
                className="relative aspect-[4/5] sm:aspect-square rounded-xl overflow-hidden bg-nile-100"
              >
                <Image
                  src={src}
                  alt="Processing facility"
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}

function StandardCard({
  icon, title, body, accent,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  accent: "nile" | "earth" | "sand";
}) {
  const colors = {
    nile: "bg-nile-100 text-nile-700",
    earth: "bg-earth-500/10 text-earth-700",
    sand: "bg-sand-100 text-sand-600",
  }[accent];

  return (
    <div className="rounded-2xl bg-white border border-nile-100 p-8 h-full">
      <div className={`inline-flex items-center justify-center h-14 w-14 rounded-full ${colors} mb-5`}>
        {icon}
      </div>
      <h3 className="font-display text-2xl text-nile-900 font-medium mb-3">{title}</h3>
      <p className="text-base text-nile-700/85 leading-relaxed">{body}</p>
    </div>
  );
}

function TimelineRow({ number, text, isLast }: { number: number; text: string; isLast: boolean }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-nile-900 text-sand-50 font-display text-base font-medium flex-shrink-0">
          {number}
        </div>
        {!isLast && <div className="w-px h-12 bg-nile-200" />}
      </div>
      <p className="pt-2 text-base md:text-lg text-nile-800 font-medium">{text}</p>
    </div>
  );
}
