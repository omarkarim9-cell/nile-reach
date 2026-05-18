import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
};

export function PageHero({ eyebrow, title, subtitle, image, imageAlt = "" }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nile-900/85 via-nile-900/70 to-sand-50" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sand-400/60 to-transparent" />

      <div className="relative mx-auto max-w-page px-5 md:px-8 pt-20 md:pt-28 pb-24 md:pb-32">
        <div className="max-w-2xl">
          <p className="animate-fade-up delay-1 text-xs md:text-sm uppercase tracking-[0.32em] text-sand-300 mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-sand-400" />
            {eyebrow}
          </p>
          <h1 className="animate-fade-up delay-2 font-display text-3xl md:text-5xl lg:text-6xl font-medium text-sand-50 leading-[1.1] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="animate-fade-up delay-3 mt-5 text-base md:text-lg text-sand-100/85 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
