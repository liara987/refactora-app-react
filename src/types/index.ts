export interface BaseSectionType {
  id?: string;
  type?: string;
}

export interface TextSectionType extends BaseSectionType {
  type: "text";
  content: string;
}

export interface ListItemObject {
  text: string;
  meta?: string;
  deprecatedLabel?: string;
}

export interface ListSectionType extends BaseSectionType {
  type: "list";
  items: ListItemObject[] | null;
}

export interface CalloutSectionType extends BaseSectionType {
  type: "callout";
  content: string;
  severity?: "info" | "warning" | "error" | "success";
  icon?: string;
}

export type Section = TextSectionType | ListSectionType | CalloutSectionType;

export interface ResultData {
  title?: string;
  sections?: Section[];
}
