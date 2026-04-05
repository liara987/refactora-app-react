import React from "react";
import type { CalloutSectionType } from "../../types";

const SEVERITY_STYLES: Record<NonNullable<CalloutSectionType["severity"]>, React.CSSProperties> = {
  info: { background: "#e8f4fd", borderLeft: "4px solid #2196f3", color: "#1a5276" },
  warning: { background: "#fff8e1", borderLeft: "4px solid #ff9800", color: "#7d5a00" },
  error: { background: "#fdecea", borderLeft: "4px solid #f44336", color: "#7b1c1c" },
  success: { background: "#e8f5e9", borderLeft: "4px solid #4caf50", color: "#1b5e20" },
};

export const CalloutSection: React.FC<Omit<CalloutSectionType, "type">> = ({
  id,
  content,
  severity = "info",
  icon,
}) => (
  <div
    id={id}
    style={{
      ...SEVERITY_STYLES[severity],
      padding: "12px 16px",
      borderRadius: "4px",
      margin: "8px 0",
    }}
  >
    {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
    {content}
  </div>
);

export default CalloutSection;
