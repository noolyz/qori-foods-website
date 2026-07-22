import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight text-center leading-snug transition-all duration-200 ease-out-expo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-field-600 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-field-700 text-bone-50 shadow-sm hover:bg-field-800 hover:shadow-card active:translate-y-px",
  secondary:
    "bg-clay-500 text-white shadow-sm hover:bg-clay-600 hover:shadow-card active:translate-y-px",
  outline:
    "border border-ink-300 bg-transparent text-ink-900 hover:border-field-600 hover:text-field-700 hover:bg-field-50",
  ghost: "bg-transparent text-ink-700 hover:bg-ink-100 hover:text-ink-950",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 py-2 text-sm",
  md: "min-h-11 px-6 py-2.5 text-[0.95rem]",
  lg: "min-h-14 px-8 py-3.5 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    CommonProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  "aria-label"?: string;
  onClick?: () => void;
};

/** Button-styled link. Uses localized <Link> internally unless `external`. */
export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
