import { data } from "../data/mockData";
import type { ResultData } from "../types";
import { normalizeResultData } from "../utils/normalizeResultData";

export function getResultData(): ResultData {
  return normalizeResultData(data);
}
