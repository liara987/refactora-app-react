import React from "react";
import { CalloutSection } from "../components/sections/CalloutSection";
import { ListSection } from "../components/sections/ListSection";
import { TextSection } from "../components/sections/TextSection";
import { UnknownSection } from "../components/sections/UnknownSection";
import type { ResultData, Section } from "../types";

interface ResultViewProps {
  data: ResultData;
}

const SECTION_RENDERERS: {
  [K in Section["type"]]: React.FC<Extract<Section, { type: K }>>;
} = {
  text: TextSection as React.FC<Extract<Section, { type: "text" }>>,
  list: ListSection as React.FC<Extract<Section, { type: "list" }>>,
  callout: CalloutSection as React.FC<Extract<Section, { type: "callout" }>>,
};

function renderSection(section: Section, index: number): React.ReactNode {
  const Renderer = SECTION_RENDERERS[section.type] as React.FC<Omit<Section, "type">>;

  if (!Renderer) {
    return <UnknownSection key={index} {...section} />;
  }

  const { type: _type, ...props } = section;
  return <Renderer key={section.id ?? index} {...props} />;
}

export default function ResultView({ data }: ResultViewProps) {
  const { title, sections } = data;

  return (
    <div>
      {title && <h1>{title}</h1>}
      {sections?.map((section, index) => renderSection(section, index))}
    </div>
  );
}
