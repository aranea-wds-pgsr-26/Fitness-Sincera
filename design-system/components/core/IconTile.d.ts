import React from "react";

export interface IconTileProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "lime" | "green" | "purple" | "dark" | "slate" | "white";
  /** Square side in px. Default 44. */
  size?: number;
  /** CSS border-radius. Default --radius-lg (16px). */
  radius?: string;
  /** Apply the tone's coloured glow shadow. */
  glow?: boolean;
  /** A Lucide icon element. */
  children?: React.ReactNode;
}

/** Rounded-square icon container - brand tile, meal icons, total tiles. */
export function IconTile(props: IconTileProps): JSX.Element;
