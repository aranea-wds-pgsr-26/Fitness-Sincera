import React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials when absent. */
  src?: string | null;
  initials?: string;
  /** Diameter in px. Default 40. */
  size?: number;
  tone?: "slate" | "dark" | "green" | "lime";
  /** White ring + soft shadow (for stacks on coloured surfaces). */
  ring?: boolean;
}

/** Initials-or-image avatar with optional white ring. */
export function Avatar(props: AvatarProps): JSX.Element;
