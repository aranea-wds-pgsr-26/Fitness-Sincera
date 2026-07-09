import React from "react";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: React.ReactNode;
  /** Bottom-right slot: avatar stack, badge, sparkline, etc. */
  slot?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Dashboard metric tile - label + chevron, big number, optional slot.
 * @startingPoint section="Data" subtitle="KPI / metric tile" viewport="360x150"
 */
export function StatCard(props: StatCardProps): JSX.Element;
