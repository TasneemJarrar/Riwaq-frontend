import authAxiosInstance from "./authAxiosInstance";

export interface LearningDirection {
  id: string;
  name: string | null;
  description: string | null;
}

export interface Skill {
  id: string;
  name: string | null;
  description: string | null;
}

export interface LearningDirectionDetails extends LearningDirection {
  skills: Skill[] | null;
}

export const getLearningDirections = async (): Promise<LearningDirection[]> => {
  const { data } = await authAxiosInstance.get("/api/learning-directions");
  return data;
};

export const getLearningDirection = async (
  id: string
): Promise<LearningDirectionDetails> => {
  const { data } = await authAxiosInstance.get(
    `/api/learning-directions/${id}`
  );
  return data;
};

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await authAxiosInstance.get<Skill[]>("/api/skills");
  return data;
};

export const selectLearningDirection = async (skillId: string) => {
  const { data } = await authAxiosInstance.put(
    "/api/users/me/learning-direction",
    { skillId }
  );
  return data;
};