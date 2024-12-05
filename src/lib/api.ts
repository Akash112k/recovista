export interface Recommendation {
  id: string;
  title: string;
  description: string;
  score: number;
  model: string;
}

export const fetchRecommendations = async (userId: string, model: string): Promise<Recommendation[]> => {
  // Simulated API call - replace with actual endpoint
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return Array.from({ length: 6 }, (_, i) => ({
    id: `${i}`,
    title: `Recommendation ${i + 1}`,
    description: `This is a personalized recommendation for user ${userId} from ${model}`,
    score: Math.round((Math.random() * 100)) / 100,
    model,
  }));
};