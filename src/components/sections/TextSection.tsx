import React from "react";
import type { TextSectionType } from "../../types";

export const TextSection: React.FC<Omit<TextSectionType, "type">> = ({ id, content }) => (
  <p id={id}>{content}</p>
);

export default TextSection;
