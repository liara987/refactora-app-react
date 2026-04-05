import React from "react";
import type { BaseSectionType } from "../../types";

export const UnknownSection: React.FC<BaseSectionType> = ({ type }) => {
  if (!import.meta.env.DEV) return null;

  return (
    <div style={{ border: "1px dashed #ccc", color: "#999", padding: "8px", fontSize: "0.85em" }}>
      [Seção desconhecida: "{type ?? "sem type"}"]
    </div>
  );
};

export default UnknownSection;
