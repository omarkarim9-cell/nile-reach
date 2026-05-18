import { useTranslations } from "next-intl";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export default function AboutPage() {
  const t = useTranslations("about.page");
  const tStats = useTranslations("stats");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/sheep-flock-1.jpg"
      />

      {/* ===== STORY ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-10 md:gap-16">
          <div className="md:col-span-1">
            <p className="text-xs uppercase tracking-[0.28em] text-sand-500 mb-3">
              — {t("storyTitle")}
            </p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <p className="font-display text-2xl md:text-3xl text-nile-900 leading-snug tracking-tight">
              {t("storyBody1")}
            </p>
            <p className="text-base md:text-lg text-nile-700/85 leading-relaxed">
              {t("storyBody2")}
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
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

          <div className="grid md:grid-cols-5 gap-4 md:gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <ProcessCard
                key={n}
                number={n}
                title={t(`step${n}Title`)}
                body={t(`step${n}Body`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl md:text-5xl font-medium text-nile-900 leading-tight tracking-tight">
            {t("valuesTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <ValueCard
              key={n}
              title={t(`value${n}Title`)}
              body={t(`value${n}Body`)}
            />
          ))}
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="mx-auto max-w-page px-5 md:px-8 mb-20">
        <div className="rounded-2xl bg-nile-900 text-sand-50 grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-nile-700/40 rtl:divide-x-reverse overflow-hidden">
          <Stat number="20+" label={tStats("countries")} />
          <Stat number="15+" label={tStats("products")} />
          <Stat number="30+" label={tStats("experience")} />
          <Stat number="100%" label={tStats("certified")} />
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ProcessCard({ number, title, body }: { number: number; title: string; body: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-sand-200">
      <div className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-nile-900 text-sand-50 font-display text-base font-medium mb-4">
        {number}
      </div>
      <h3 className="font-display text-lg text-nile-900 font-medium mb-2">{title}</h3>
      <p className="text-sm text-nile-700/80 leading-relaxed">{body}</p>
    </div>
  );
}

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white border border-nile-100 p-8">
      <h3 className="font-display text-2xl text-nile-900 font-medium mb-3">{title}</h3>
      <p className="text-base text-nile-700/85 leading-relaxed">{body}</p>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="px-6 py-8 text-center">
      <p className="font-display text-3xl md:text-4xl font-medium text-sand-50 leading-none">
        {number}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-sand-300/80 leading-tight">
        {label}
      </p>
    </div>
  );
}
