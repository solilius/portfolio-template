import React from "react";
import { iconPaths } from "../iconPaths";
import { IconName } from "../types";

const Icon: React.FC<{ name: IconName; size?: number }> = ({ name, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={iconPaths[name]} />
  </svg>
);

export default Icon;
