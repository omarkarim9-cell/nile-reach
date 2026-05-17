import { clsx } from "clsx";

type Props = {
  className?: string;
  /** "mark" = just emblem; "full" = emblem + wordmark below */
  variant?: "full" | "mark";
};

/**
 * Nile Reach Global logo
 * The SVG is a clean vector recreation of the original brand mark:
 * a circular emblem with corn (top), sheep (left), cow (right),
 * and Nile waters at the bottom.
 *
 * Size is controlled by the parent — pass className like "h-12 w-12".
 */
export function Logo({ className, variant = "full" }: Props) {
  if (variant === "mark") {
    return <LogoMark className={className} />;
  }

  return (
    <div className={clsx("inline-flex flex-col items-center gap-2", className)}>
      <LogoMark className="h-16 w-16" />
      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-lg font-semibold tracking-wide text-nile-800">
          NILE&nbsp;REACH
        </span>
        <span className="mt-0.5 text-[9px] uppercase tracking-[0.32em] text-sand-500">
          Global
        </span>
      </div>
    </div>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={clsx("block", className)}
      role="img"
      aria-label="Nile Reach Global"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="#FAF7F2"
        stroke="#0E2A47"
        strokeWidth="5"
      />

      {/* Nile waters at the bottom */}
      <path
        d="M 12 138 Q 50 160 100 145 Q 150 160 188 138 L 188 192 L 12 192 Z"
        fill="#1E4E78"
      />
      <path
        d="M 12 148 Q 50 168 100 153 Q 150 168 188 148"
        fill="none"
        stroke="#FAF7F2"
        strokeWidth="1.5"
        opacity="0.45"
      />
      <path
        d="M 12 158 Q 50 176 100 162 Q 150 176 188 158"
        fill="none"
        stroke="#FAF7F2"
        strokeWidth="1.2"
        opacity="0.35"
      />

      {/* Center divider hint */}
      <path
        d="M 100 50 L 100 138"
        stroke="#0E2A47"
        strokeWidth="3"
        fill="none"
        opacity="0.18"
      />

      {/* Corn (center top) */}
      <g transform="translate(100, 72)">
        <path d="M -22 8 Q -34 -8 -20 -22 Q -10 -10 -8 4 Z" fill="#4A7C5F" />
        <path d="M 22 8 Q 34 -8 20 -22 Q 10 -10 8 4 Z" fill="#4A7C5F" />
        <ellipse cx="0" cy="0" rx="9" ry="22" fill="#C9A961" />
        <g stroke="#8F6629" strokeWidth="0.8" opacity="0.6" fill="none">
          <line x1="-6" y1="-14" x2="6" y2="-14" />
          <line x1="-7" y1="-7" x2="7" y2="-7" />
          <line x1="-7" y1="0" x2="7" y2="0" />
          <line x1="-7" y1="7" x2="7" y2="7" />
          <line x1="-6" y1="14" x2="6" y2="14" />
        </g>
        <path
          d="M -3 -22 Q 0 -28 3 -22"
          stroke="#8F6629"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Sheep silhouette (left) */}
      <g transform="translate(48, 105)" fill="#0E2A47">
        <ellipse cx="0" cy="0" rx="18" ry="12" />
        <ellipse cx="-14" cy="-3" rx="7" ry="6" />
        <path
          d="M -19 -7 Q -22 -12 -17 -13"
          stroke="#0E2A47"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M -15 -8 Q -12 -13 -10 -10"
          stroke="#0E2A47"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="-16" cy="-2" r="0.9" fill="#FAF7F2" />
        <rect x="-12" y="9" width="2.5" height="8" />
        <rect x="-5" y="9" width="2.5" height="8" />
        <rect x="4" y="9" width="2.5" height="8" />
        <rect x="11" y="9" width="2.5" height="8" />
      </g>

      {/* Cow silhouette (right) */}
      <g transform="translate(152, 105)" fill="#0E2A47">
        <ellipse cx="0" cy="0" rx="20" ry="12" />
        <ellipse cx="15" cy="-2" rx="8" ry="7" />
        <path
          d="M 11 -10 Q 8 -16 13 -17"
          stroke="#0E2A47"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 19 -10 Q 22 -16 17 -17"
          stroke="#0E2A47"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="17" cy="-2" r="1" fill="#FAF7F2" />
        <rect x="-13" y="9" width="2.5" height="8" />
        <rect x="-6" y="9" width="2.5" height="8" />
        <rect x="3" y="9" width="2.5" height="8" />
        <rect x="10" y="9" width="2.5" height="8" />
        <path
          d="M -18 -2 Q -25 1 -22 7"
          stroke="#0E2A47"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
