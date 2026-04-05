import type {
  CalloutSectionType,
  ListItemObject,
  ListSectionType,
  ResultData,
  Section,
  TextSectionType,
} from "../types";

type RawSection = Record<string, unknown>;
type SectionNormalizer = (raw: RawSection) => Section | null;

function normalizeListItem(item: unknown): ListItemObject | null {
  if (typeof item === "string") return { text: item };
  if (typeof item === "object" && item !== null && "text" in item) {
    return item as ListItemObject;
  }
  return null;
}

const sectionNormalizers: Record<string, SectionNormalizer> = {
  text: (raw): TextSectionType | null => {
    const content = raw.content ?? raw.body;
    if (typeof content !== "string") return null;
    return { type: "text", id: raw.id as string | undefined, content };
  },

  list: (raw): ListSectionType => ({
    type: "list",
    id: raw.id as string | undefined,
    items: Array.isArray(raw.items)
      ? raw.items.map(normalizeListItem).filter((i): i is ListItemObject => i !== null)
      : null,
  }),

  callout: (raw): CalloutSectionType | null => {
    if (typeof raw.content !== "string") return null;
    return {
      type: "callout",
      id: raw.id as string | undefined,
      content: raw.content,
      severity: isValidSeverity(raw.severity) ? raw.severity : undefined,
      icon: typeof raw.icon === "string" ? raw.icon : undefined,
    };
  },
};

function isValidSeverity(value: unknown): value is "info" | "warning" | "error" | "success" {
  return ["info", "warning", "error", "success"].includes(value as string);
}

function normalizeSection(raw: RawSection): Section | null {
  const type = String(raw.type ?? "");
  const normalizer = sectionNormalizers[type];

  if (normalizer) return normalizer(raw);

  return { type, id: raw.id as string | undefined } as Section;
}

export function normalizeResultData(raw: Record<string, unknown>): ResultData {
  return {
    title: typeof raw.title === "string" ? raw.title : undefined,
    sections: Array.isArray(raw.sections)
      ? raw.sections
          .filter((s): s is RawSection => typeof s === "object" && s !== null)
          .map(normalizeSection)
          .filter((s): s is Section => s !== null)
      : [],
  };
}
