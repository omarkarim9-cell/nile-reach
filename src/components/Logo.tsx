import { clsx } from "clsx";

type Props = {
  className?: string;
  /** kept for backwards-compatibility; both variants render the same image */
  variant?: "full" | "mark";
};

/**
 * Nile Reach Global logo
 * Uses the brand's actual logo image at /public/images/logo.jpg.
 * Sizing is controlled by the parent via className (e.g. "h-12 w-auto").
 */
export function Logo({ className }: Props) {
  return (
    <img
      src="/images/logo.png"
      alt="Nile Reach Global Group"
      className={clsx("block object-contain", className)}
    />
  );
}
