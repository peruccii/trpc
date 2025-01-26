"use client"

import { forwardRef } from "react"
import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CustomInput = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 rounded-md border border-input px-3 py-2 text-sm",
        "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "shadow-[0_0_15px_rgba(255,255,255,0.1)]", // White glow effect
        "transition-shadow duration-200",
        "hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]", // Increased glow on hover
        "focus:shadow-[0_0_25px_rgba(255,255,255,0.2)]", // Even more glow on focus
        "bg-transparent", // Transparent background
        "text-white", // White text color for better visibility on dark backgrounds
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
CustomInput.displayName = "CustomInput"

// Example usage component
export default function InputDemo() {
  return (
    <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Default state */}
        <CustomInput placeholder="Default input with glow..." />

        {/* Disabled state */}
        <CustomInput placeholder="Disabled input..." disabled />

        {/* With value */}
        <CustomInput placeholder="Type something..." defaultValue="Input with value" />

        {/* With label */}
        <div className="space-y-2">
          <label htmlFor="with-label" className="text-sm font-medium text-white">
            Labeled Input
          </label>
          <CustomInput id="with-label" placeholder="Input with label..." />
        </div>
      </div>
    </div>
  )
}
