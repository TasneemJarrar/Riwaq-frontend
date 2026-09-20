import { useQuery } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxiosInstance";

export interface SkillResponse {
  id: string;
  name: string;
  description?: string;
}

async function fetchSkills(): Promise<SkillResponse[]> {
  const { data } = await authAxiosInstance.get<SkillResponse[]>("/api/skills");
  return data;
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 5 * 60 * 1000,
  });
}