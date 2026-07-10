import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Lime primary by default; green/purple carry section context. */
  variant?: "primary" | "green" | "purple" | "dark" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /** Element rendered before the label (e.g. a Lucide icon). */
  icon?: React.ReactNode;
  /** Element rendered after the label. */
  iconRight?: React.ReactNode;
  /** Full-width. */
  block?: boolean;
  /** UPPERCASE label with wide tracking (used on confirm/CTA buttons). */
  uppercase?: boolean;
  children?: React.ReactNode;
}

/**
 * Pill / rounded action button - the product's primary control.
 * @startingPoint section="Controls" subtitle="Lime/green/purple action button" viewport="700x120"
 */
export function Button(props: ButtonProps): JSX.Element;
