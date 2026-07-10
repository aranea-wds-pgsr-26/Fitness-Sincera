import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply default 24px padding. Default true. */
  pad?: boolean;
  /** CSS border-radius. Default --radius-xl (24px). */
  radius?: string;
  /** Adds the signature lift-on-hover. */
  interactive?: boolean;
  children?: React.ReactNode;
}

/**
 * The canonical white work surface - soft shadow, generous radius.
 * @startingPoint section="Surfaces" subtitle="White content card" viewport="700x200"
 */
export function Card(props: CardProps): JSX.Element;
