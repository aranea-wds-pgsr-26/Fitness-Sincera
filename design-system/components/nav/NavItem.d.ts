import React from "react";

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading Lucide icon. */
  icon?: React.ReactNode;
  label?: string;
  active?: boolean;
  /** Active-state colour: lime (default) or purple for the Treino context. */
  context?: "lime" | "purple";
  /** Trailing count badge. */
  count?: number | null;
}

/** Sidebar nav row for the dark shell. */
export function NavItem(props: NavItemProps): JSX.Element;
