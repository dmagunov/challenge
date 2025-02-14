export interface ApiVersion {
  date: string;
  status: "current" | "deprecated" | "sunset";
  sunset?: Date;
}

export const API_VERSIONS: Record<string, ApiVersion> = {
  "2024-01-01": {
    date: "2024-01-01",
    status: "current",
  },
};
