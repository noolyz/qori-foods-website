import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-xl border border-ink-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 shadow-sm transition-colors duration-150 focus:border-field-600 focus:outline-none focus:ring-2 focus:ring-field-600/30 disabled:cursor-not-allowed disabled:bg-ink-50 aria-[invalid=true]:border-clay-500 aria-[invalid=true]:ring-clay-500/25";

export function FieldWrapper({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
        {label}
        {required ? <span className="ml-0.5 text-clay-600">*</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="text-xs text-ink-500">{hint}</p> : null}
      {error ? (
        <p className="text-xs font-medium text-clay-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(controlBase, className)} {...props} />
  ),
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(controlBase, "min-h-32 resize-y", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(controlBase, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  ),
);
Select.displayName = "Select";
